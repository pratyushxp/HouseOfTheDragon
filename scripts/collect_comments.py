from youtube_comment_downloader import YoutubeCommentDownloader
import pandas as pd
import time

downloader = YoutubeCommentDownloader()

all_comments = []

with open("scripts/video_urls.txt", "r") as f:
    urls = [line.strip() for line in f if line.strip()]

for url in urls:

    print(f"Processing: {url}")

    try:
        for i, comment in enumerate(
            downloader.get_comments_from_url(url)
        ):

            all_comments.append({
                "video_url": url,
                "comment": comment["text"]
            })

            if i >= 299:  # 300 comments per video
                break

        time.sleep(2)

    except Exception as e:
        print("Error:", e)

df = pd.DataFrame(all_comments)

df.to_csv("data/hotd_comments.csv", index=False)

print("\nDataset created!")
print("Total comments:", len(df))
print(df.head())