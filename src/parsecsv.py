import csv
from sys import argv
import firebase_admin
from firebase_admin import firestore
import nanoid


# cred_obj = firebase_admin.credentials.Certificate('....path to file')
# default_app = firebase_admin.initialize_app(cred_object, {
# 	'databaseURL':databaseURL
# 	})

cred_obj = firebase_admin.credentials.Certificate('./chatgpt-prompt-search-firebase-adminsdk-g9lsr-3b5ef3e34e.json')
default_app = firebase_admin.initialize_app(cred_obj)
# show contents of "entries" in the database
db = firestore.client()

def write_entry(act, prompt):
    id = act + nanoid.generate(size=6)
    doc_ref = db.collection(f'entries').document(id)
    doc_ref.set({
        f'template': act,
        f'title': prompt,
        f'view': 0,
        f'tags': []
    })

# Open the CSV file
if len(argv) != 2:
    print("Usage: python parsecsv.py <csv file>")
    exit(1)

with open(argv[1], 'r') as file:
  # Create a CSV reader object
  reader = csv.reader(file)

  # for row in reader:
  #   # row is a list of values in the current row
  #   write_entry(row[0], row[1])

  # batch write
  batch = db.batch()
  for row in reader:
      id = row[0].replace(" ", "-").replace("/", "") + "-" + nanoid.generate(size=6)
      doc_ref = db.collection(f'entries').document(id)
      batch.set(doc_ref, {
          f'template': row[1],
          f'title': row[0],
          f'views': 0,
          f'tags': []
      })
  batch.commit()
