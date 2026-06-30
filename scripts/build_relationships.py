import pandas as pd
from itertools import combinations
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
    "Arrax",
]

pair_counter = Counter()

for comment in df["comment"].fillna("").astype(str):

    comment_lower = comment.lower()

    found = [
        character
        for character in characters
        if character.lower() in comment_lower
    ]

    # Remove duplicates in a single comment
    found = sorted(set(found))

    # Count each pair
    for pair in combinations(found, 2):
        pair_counter[pair] += 1

relationship_df = pd.DataFrame(
    [
        {
            "source": source,
            "target": target,
            "strength": strength,
        }
        for (source, target), strength in pair_counter.items()
    ]
)

relationship_df = relationship_df.sort_values(
    by="strength",
    ascending=False,
)

relationship_df.to_csv(
    "data/character_relationships.csv",
    index=False,
)

print("\nTop relationships:\n")
print(relationship_df.head(20))

print("\nTotal unique relationships:", len(relationship_df))