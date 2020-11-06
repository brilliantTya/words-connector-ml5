from random import choice
import json

def load_words():
    with open("/Users/tyawang/OneDrive/MLNI/midterm_proj/libraries/data.json") as word_file:
        # valid_words = set(word_file.read().split())
        words = json.load(word_file)
        adjs = words['adjs']
        nouns = words['nouns']

    return adjs + nouns


if __name__ == '__main__':
    english_words = load_words()
    # demo print
    print(choice(english_words))
