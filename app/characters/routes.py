from fastapi import APIRouter
import pandas as pd

router = APIRouter()

@router.get("/characters")
def get_all_characters():

    df = pd.read_csv("data/character_profiles.csv")

    df = df.sort_values(
        by="mentions",
        ascending=False
    )

    return df.to_dict(orient="records")