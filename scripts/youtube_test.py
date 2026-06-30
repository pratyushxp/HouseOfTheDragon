from youtube_comment_downloader import YoutubeCommentDownloader

downloader = YoutubeCommentDownloader()

url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

comments = downloader.get_comments_from_url(url)

for i, comment in enumerate(comments):
    print(comment["text"])
    
    if i == 9:
        break