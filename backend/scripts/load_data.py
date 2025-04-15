import os
import pandas as pd
from sqlalchemy import create_engine, MetaData, Table, text

# Obtener la URL de la base de datos desde variables de entorno
DATABASE_URL = os.getenv("DATABASE_URL")

# Crear el motor de conexión y reflejar la metadata
engine = create_engine(DATABASE_URL)
metadata = MetaData()
metadata.reflect(bind=engine)

# Obtener la tabla "customers"
tabla = metadata.tables.get("customers")
if tabla is None:
    raise Exception("No se encontró la tabla 'customers'")

# Ruta al archivo CSV
csv_path = os.path.join("/app/data", "clean_data.csv")

# Mapeo de columnas del CSV a columnas de la base de datos
column_mapping = {
    "Customer_ID": "customer_id",
    "Num_Credit_Card": "num_credit_cards",
    "Age": "age",
    "Occupation": "occupation",
    "Annual_Income": "annual_income",
    "Monthly_Inhand_Salary": "monthly_inhand_salary",
    "Num_Bank_Accounts": "num_bank_accounts",
    "Interest_Rate": "interest_rate",
    "Num_of_Loan": "num_of_loan",
    "Delay_from_due_date": "delay_from_due_date",
    "Num_of_Delayed_Payment": "num_of_delayed_payment",
    "Changed_Credit_Limit": "changed_credit_limit",
    "Num_Credit_Inquiries": "num_credit_inquiries",
    "Credit_Mix": "credit_mix",
    "Outstanding_Debt": "outstanding_debt",
    "Credit_Utilization_Ratio": "credit_utilization_ratio",
    "Credit_History_Age": "credit_history_age",
    "Payment_of_Min_Amount": "payment_of_min_amount",
    "Total_EMI_per_month": "total_emi_per_month",
    "Amount_invested_monthly": "amount_invested_monthly",
    "Payment_Behaviour": "payment_behaviour",
    "Monthly_Balance": "monthly_balance",
    "Last_Loan_9": "last_loan_9",
    "Last_Loan_8": "last_loan_8",
    "Last_Loan_7": "last_loan_7",
    "Last_Loan_6": "last_loan_6",
    "Last_Loan_5": "last_loan_5",
    "Last_Loan_4": "last_loan_4",
    "Last_Loan_3": "last_loan_3",
    "Last_Loan_2": "last_loan_2",
    "Last_Loan_1": "last_loan_1",
    "Credit_Score": "credit_score"
}

# Columnas que deben convertirse a integer
int_columns = [
    "age", "num_bank_accounts", "num_credit_cards", "num_of_loan",
    "num_credit_inquiries", "credit_history_age", "delay_from_due_date",
    "num_of_delayed_payment"
]

# Columnas que deben convertirse a float
float_columns = [
    "annual_income", "monthly_inhand_salary", "interest_rate",
    "changed_credit_limit", "outstanding_debt", "credit_utilization_ratio",
    "total_emi_per_month", "amount_invested_monthly", "monthly_balance"
]

# Leer CSV y renombrar columnas
df = pd.read_csv(csv_path)
df = df.rename(columns=column_mapping)

# Conversión de tipos
for col in int_columns:
    if col in df.columns:
        df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0).astype(int)

for col in float_columns:
    if col in df.columns:
        df[col] = pd.to_numeric(df[col], errors='coerce')

# Borrar datos existentes y luego insertar
with engine.begin() as conn:
    conn.execute(text(f"DELETE FROM {tabla.name}"))
    df.to_sql(tabla.name, con=conn, if_exists='append', index=False)
