import streamlit as st
import base64

st.set_page_config(
    page_title="The Maester's Observatory",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# ---------- Background ----------

def get_base64(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode()

bg = get_base64("assets/backgrounds/home.jpg")

st.markdown(
    f"""
<style>

header {{
    visibility: hidden;
}}

#MainMenu {{
    visibility: hidden;
}}

footer {{
    visibility: hidden;
}}

.stApp {{
    background: url("data:image/jpg;base64,{bg}");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}}

.hero {{
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    background: linear-gradient(
        rgba(0,0,0,.15),
        rgba(0,0,0,.55),
        rgba(0,0,0,.85)
    );

    color: white;
}}

.title {{
    font-size: 72px;
    font-weight: 800;
    margin-bottom: 15px;
}}

.subtitle {{
    font-size: 28px;
    color: #dddddd;
    margin-bottom: 45px;
}}

.enter-btn {{
    display:inline-block;
    padding:18px 50px;

    border:2px solid #c7a55b;

    color:#c7a55b;

    background:rgba(0,0,0,.15);

    text-decoration:none;

    border-radius:8px;

    font-size:22px;

    font-weight:700;

    transition:0.3s;
}}

.enter-btn:hover {{

    background:#c7a55b;

    color:black;

    box-shadow:0px 0px 25px #c7a55b;

}}

</style>
""",
    unsafe_allow_html=True,
)

st.markdown(
    """
<div class="hero">

<div class="title">
🐉<br>
The Maester's Observatory
</div>

<div class="subtitle">
Explore Westeros Through AI
</div>

<a class="enter-btn" href="#">
ENTER THE REALM
</a>

</div>
""",
    unsafe_allow_html=True,
)