from flask import Flask, request, jsonify
from flask_cors import CORS
from pathlib import Path
import pandas as pd
from sentence_transformers import SentenceTransformer, util

# ============================================================
# CONFIGURATION
# ============================================================

app = Flask(__name__)
CORS(app)

# Your existing Python project
EARLY_DISEASE_DIR = Path(
    r"C:\Users\arun\OneDrive\Documents\early disease"
)

DATA_PATH = EARLY_DISEASE_DIR / "data" / "cleaned_disease_symptoms.csv"

# ============================================================
# LOAD DATASET
# ============================================================

print("Loading disease dataset...")

if not DATA_PATH.exists():
    raise FileNotFoundError(
        f"Dataset not found:\n{DATA_PATH}"
    )

df = pd.read_csv(DATA_PATH)

if "diseases" not in df.columns:
    raise ValueError(
        "The dataset does not contain the 'diseases' column."
    )

symptom_columns = [
    column for column in df.columns
    if column != "diseases"
]

print(f"Dataset loaded: {len(df)} records")
print(f"Diseases: {df['diseases'].nunique()}")
print(f"Symptoms: {len(symptom_columns)}")

# ============================================================
# LOAD SEMANTIC MODEL
# ============================================================

print("Loading AI symptom model...")

model = SentenceTransformer(
    "sentence-transformers/all-MiniLM-L6-v2"
)

print("AI model loaded successfully.")

# ============================================================
# CREATE SYMPTOM EMBEDDINGS
# ============================================================

print("Preparing symptom embeddings...")

symptom_embeddings = model.encode(
    symptom_columns,
    convert_to_tensor=True,
    normalize_embeddings=True,
    show_progress_bar=True
)

print("Symptom embeddings ready.")

# ============================================================
# DISEASE INFORMATION
# ============================================================

def get_simple_disease_info(disease_name):
    """
    Uses the existing disease_terms.py file when available.
    """

    try:
        import sys

        if str(EARLY_DISEASE_DIR) not in sys.path:
            sys.path.insert(0, str(EARLY_DISEASE_DIR))

        from disease_terms import get_disease_information

        info = get_disease_information(disease_name)

        if isinstance(info, dict):
            return {
                "medical_name": info.get(
                    "medical_name",
                    disease_name
                ),
                "explanation": info.get(
                    "explanation",
                    "Information about this condition is available."
                )
            }

        return {
            "medical_name": disease_name,
            "explanation": str(info)
        }

    except Exception:
        return {
            "medical_name": disease_name,
            "explanation": (
                "This is a health condition identified "
                "from the reported symptoms."
            )
        }


# ============================================================
# SYMPTOM PREDICTION
# ============================================================

def predict_from_symptoms(user_input):

    if not user_input or not user_input.strip():
        return {
            "success": False,
            "message": "Please enter at least one symptom."
        }

    # --------------------------------------------------------
    # Split user's natural-language input
    # --------------------------------------------------------

    raw_parts = [
        part.strip()
        for part in user_input.replace("\n", ",").split(",")
        if part.strip()
    ]

    if not raw_parts:
        raw_parts = [user_input.strip()]

    # --------------------------------------------------------
    # Semantic symptom matching
    # --------------------------------------------------------

    matched_symptoms = []

    for phrase in raw_parts:

        phrase_embedding = model.encode(
            phrase,
            convert_to_tensor=True,
            normalize_embeddings=True
        )

        similarities = util.cos_sim(
            phrase_embedding,
            symptom_embeddings
        )[0]

        best_index = int(similarities.argmax())
        best_score = float(similarities[best_index])

        # Same semantic threshold used in the existing
        # symptom prediction workflow.
        if best_score >= 0.55:

            matched_symptom = symptom_columns[best_index]

            if matched_symptom not in matched_symptoms:
                matched_symptoms.append(matched_symptom)

    # --------------------------------------------------------
    # No symptoms recognized
    # --------------------------------------------------------

    if not matched_symptoms:
        return {
            "success": False,
            "message": (
                "I could not confidently match the entered "
                "symptoms with the available dataset. "
                "Please describe the symptoms more clearly."
            )
        }

    # --------------------------------------------------------
    # Find diseases containing matched symptoms
    # --------------------------------------------------------

    working_df = df.copy()

    working_df["matched_symptom_count"] = (
        working_df[matched_symptoms]
        .sum(axis=1)
    )

    candidate_rows = working_df[
        working_df["matched_symptom_count"] > 0
    ]

    if candidate_rows.empty:
        return {
            "success": False,
            "message": (
                "No possible condition was found from "
                "the reported symptoms."
            ),
            "matched_symptoms": matched_symptoms
        }

    # --------------------------------------------------------
    # Rank diseases by number of matched symptoms
    # --------------------------------------------------------

    disease_scores = (
        candidate_rows
        .groupby("diseases")["matched_symptom_count"]
        .max()
        .sort_values(ascending=False)
    )

    # Keep top possible diseases.
    top_diseases = disease_scores.head(10).index.tolist()

    # --------------------------------------------------------
    # Build user-friendly response
    # --------------------------------------------------------

    results = []

    for disease in top_diseases:

        information = get_simple_disease_info(disease)

        results.append({
            "disease": disease,
            "medical_name": information["medical_name"],
            "explanation": information["explanation"]
        })

    return {
        "success": True,
        "matched_symptoms": matched_symptoms,
        "possible_diseases": results,
        "disclaimer": (
            "Based on the reported symptoms, the system "
            "provides a preliminary prediction of possible "
            "diseases to support early identification. "
            "It is not a medical diagnosis."
        )
    }


# ============================================================
# API: HEALTH CHECK
# ============================================================

@app.route("/api/health", methods=["GET"])
def health_check():

    return jsonify({
        "success": True,
        "message": "Health AI backend is running.",
        "module": "Symptom Disease Prediction"
    })


# ============================================================
# API: SYMPTOM PREDICTION
# ============================================================

@app.route("/api/symptom/predict", methods=["POST"])
def symptom_prediction():

    try:

        data = request.get_json(silent=True)

        if not data:
            return jsonify({
                "success": False,
                "message": "No JSON data received."
            }), 400

        user_input = data.get("symptoms", "")

        result = predict_from_symptoms(user_input)

        return jsonify(result)

    except Exception as error:

        print("Prediction error:", error)

        return jsonify({
            "success": False,
            "message": "An error occurred while analyzing symptoms.",
            "error": str(error)
        }), 500


# ============================================================
# START SERVER
# ============================================================

if __name__ == "__main__":

    print()
    print("=" * 60)
    print("        HEALTH AI BACKEND")
    print("=" * 60)
    print("Symptom AI API is ready.")
    print("Server: http://127.0.0.1:5000")
    print("=" * 60)
    print()

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=False
    )