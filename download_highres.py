import urllib.request
import json
import os

def download_wiki_image(title, filename):
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={title}&prop=pageimages&format=json&pithumbsize=800"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            pages = data['query']['pages']
            for page_id in pages:
                if 'thumbnail' in pages[page_id]:
                    image_url = pages[page_id]['thumbnail']['source']
                    print(f"Downloading {title} from {image_url}")
                    urllib.request.urlretrieve(image_url, filename)
                    return True
    except Exception as e:
        print(f"Error: {e}")
    return False

# Download a tractor image
download_wiki_image("Tractor", "public/category_equipment.jpg")

# Download a pesticide spraying image (Crop_sprayer or Agricultural_drone)
if not download_wiki_image("Agricultural_drone", "public/category_pesticides.jpg"):
    download_wiki_image("Pesticide_application", "public/category_pesticides.jpg")

# Download a fertilizer/soil image
if not download_wiki_image("Fertilizer", "public/category_fertilizers.jpg"):
    download_wiki_image("Soil", "public/category_fertilizers.jpg")

