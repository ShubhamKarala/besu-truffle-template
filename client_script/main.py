import csv
import subprocess
import json
import urllib.parse
import argparse

parser = argparse.ArgumentParser()
parser.add_argument( "-i","--input",help="Select input CSV file" )
parser.add_argument( "-o","--output",help="Output file" )
parser.parse_args()
args = parser.parse_args()

if args.input and args.output:
    with open(str(args.input), newline = '', encoding='utf-8', errors='ignore') as csvfile:
        reader = csv.DictReader(csvfile, delimiter=";")
        with open(str(args.output), 'a', newline='') as file:
            fieldnames = ['Name', 'Email', 'Institute', 'Grade', 'transactionHash', 'status', 'to', 'blockNumber']
            writer = csv.DictWriter(file, fieldnames=fieldnames)
            writer.writeheader()
            for row in reader:
                print(row['Name'])
                process = subprocess.run(
                    ['node', 'script.js', row['Name'], row['Institute']],
                    text=True,
                    stdout=subprocess.PIPE,
                    check=True
                )
                for line in process.stdout.split():
                    nameConverted = { "Name": row['Name'], "Email": row["Email"], "Institute": row["Institute"], "Grade": row["Grade"] }
                    data = json.loads(line)
                    data.update(nameConverted)
                    writer.writerow(data)
                    print(data)
                    
else:
    print("usage: python main.py -i <input_file.csv> -o <results.csv>")
