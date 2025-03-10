### Overview

This is the backend for a credit score proyect. The target is to get a credit score, then use that result with other inputs to get better answers though inference rules and return more humanized answers.

### Prerequisites

We encorge to follow the steps in the main readme.md file, in the top level of this repo.
If not, you can also install python in your computer in your local environment.

### Local python instalation
Create virtual env
python -m venv .venv

Activate virtual env
python .venv/Scripts/activate

Install fastapi
pip install "fastapi[standard]"

Run the app in your terminal or bash
fastapi dev api/main.py

### Editable data

To test by your own, you can change the json files, in other to add your own rules, based on Experta json syntax or can replace the .pkl file.
Just ensure it has values that match the rules.
