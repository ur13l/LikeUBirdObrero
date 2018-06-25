from PIL import Image
import sys

def is_between(original, check):
    return original - 60 <= check <= original + 60


if __name__ == "__main__":
    picture = Image.open(sys.argv[1]).convert('RGBA')
    r_i = 255
    g_i = 255
    b_i = 255

    width, height = picture.size

    for x in range(width):
        for y in range(height):
            (r,g,b,a) = picture.getpixel((x,y))
            if( is_between(r_i, r) and is_between(g_i, g) and is_between(b_i, b)):
                picture.putpixel( (x,y), (159, 84, 201))
                picture.save(sys.argv[1], 'PNG')