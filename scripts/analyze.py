import sys
import json
import re
from datetime import datetime

def send_json(data):
    output = json.dumps(data, ensure_ascii=False)
    sys.stdout.buffer.write(output.encode("utf-8"))
    sys.stdout.flush()

def analyze_text(content: str):
    cleaned = content.strip()
    lines = cleaned.splitlines() if cleaned else []

    chinese_keywords = re.findall(r"[\u4e00-\u9fff]{2,}", cleaned)
    english_keywords = re.findall(r"[A-Za-z]{3,}", cleaned)

    keywords = []
    for item in chinese_keywords + english_keywords:
        if item not in keywords:
            keywords.append(item)

    if len(cleaned) < 50:
        summary = "这是一段较短的文本。"
    elif len(cleaned) < 200:
        summary = "这是一段中等长度文本，可以进一步总结重点。"
    else:
        summary = "这是一段较长文本，建议进行摘要、关键词提取或结构化整理。"

    return {
        "characterCount": len(cleaned),
        "lineCount": len(lines),
        "wordLikeCount": len(chinese_keywords) + len(english_keywords),
        "keywords": keywords[:8],
        "summary": summary,
        "analyzedAt": datetime.now().isoformat()
    }


def main():
    try:
        raw_input = sys.stdin.buffer.read().decode("utf-8")
        data = json.loads(raw_input)

        content = data.get("content", "")

        if not isinstance(content, str) or content.strip() == "":
            send_json({
                "error": "content must be a non-empty string"
            })
            return

        result = analyze_text(content)
        send_json(result)

    except Exception as error:
        send_json({
            "error": str(error)
        })


if __name__ == "__main__":
    main()