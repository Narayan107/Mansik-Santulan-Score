from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_greet_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == ["Welcome to Sheryians AI School Guys"] or "Welcome to Sheryians AI School Guys" in str(response.json())

def test_predict_endpoint_valid_india():
    payload = {
        "age": 22,
        "gender": "Male",
        "country": "India",
        "academic_level": "Graduate",
        "most_used_platform": "YouTube",
        "purpose_of_use": "Entertainment",
        "avg_daily_usage_hours": 2.0,
        "daily_unlocks": 50,
        "study_hours": 2.0,
        "physical_activity_hours": 1.0,
        "sleep_hours_per_night": 7.0,
        "stress_level": "Medium"
    }
    response = client.post("/predict", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "predicted_mental_health_score" in data
    score = data["predicted_mental_health_score"]
    assert isinstance(score, float)
    assert 0.0 <= score <= 10.0

def test_predict_endpoint_other_country():
    payload = {
        "age": 20,
        "gender": "Female",
        "country": "Japan",
        "academic_level": "Undergraduate",
        "most_used_platform": "Instagram",
        "purpose_of_use": "Networking",
        "avg_daily_usage_hours": 4.5,
        "daily_unlocks": 80,
        "study_hours": 4.0,
        "physical_activity_hours": 0.5,
        "sleep_hours_per_night": 6.0,
        "stress_level": "High"
    }
    response = client.post("/predict", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "predicted_mental_health_score" in data
    assert 0.0 <= data["predicted_mental_health_score"] <= 10.0

def test_predict_validation_error():
    payload = {
        "age": 5,  # ge=10 is required
        "gender": "Male",
        "country": "India",
        "academic_level": "Graduate",
        "most_used_platform": "YouTube",
        "purpose_of_use": "Entertainment",
        "avg_daily_usage_hours": 2.0,
        "daily_unlocks": 50,
        "study_hours": 2.0,
        "physical_activity_hours": 1.0,
        "sleep_hours_per_night": 7.0,
        "stress_level": "Medium"
    }
    response = client.post("/predict", json=payload)
    assert response.status_code == 422
