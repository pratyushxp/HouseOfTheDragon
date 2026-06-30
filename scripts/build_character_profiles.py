import pandas as pd
from collections import Counter

df = pd.read_csv("data/hotd_comments.csv")

characters = [
    "Daemon",
    "Rhaenyra",
    "Alicent",
    "Aemond",
    "Aegon",
    "Viserys",
    "Otto",
    "Criston",
    "Corlys",
    "Rhaenys",
    "Jace",
    "Jacaerys",
    "Luke",
    "Lucerys",
    "Baela",
    "Rhaena",
    "Helaena",
    "Larys",
    "Mysaria",
    "Harwin",
    "Vhagar",
    "Caraxes",
    "Syrax",
    "Sunfyre",
    "Arrax"
]

profiles = []

for character in characters:

    comments = df[
        df["comment"].str.contains(
            character,
            case=False,
            na=False
        )
    ]

    profiles.append({
        "character": character,
        "mentions": len(comments)
    })

profiles_df = pd.DataFrame(profiles)

profiles_df = profiles_df.sort_values(
    "mentions",
    ascending=False
)

profiles_df.to_csv(
    "data/character_profiles.csv",
    index=False
)

print(profiles_df.head(10))