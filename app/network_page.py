import streamlit as st
import pandas as pd
import networkx as nx
from pyvis.network import Network
import tempfile

st.title("🐉 Character Relationship Network")

relationships = pd.read_csv("data/character_relationships.csv")

strengths = (
    relationships
    .groupby(["source", "target"])
    .size()
    .reset_index(name="strength")
)

top = strengths.sort_values(
    "strength",
    ascending=False
).head(50)

G = nx.Graph()

for _, row in top.iterrows():

    G.add_edge(
        row["source"],
        row["target"],
        weight=row["strength"]
    )

net = Network(
    height="700px",
    width="100%",
    bgcolor="#0e1117",
    font_color="white"
)

net.from_nx(G)

tmp_file = tempfile.NamedTemporaryFile(
    delete=False,
    suffix=".html"
)

net.save_graph(tmp_file.name)

with open(tmp_file.name, "r", encoding="utf-8") as f:
    html = f.read()

st.components.v1.html(
    html,
    height=750
)