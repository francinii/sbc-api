from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Customer(Base):
    __tablename__ = 'customers'

    id = Column(Integer, primary_key=True, autoincrement=True)
    customer_id = Column(String, unique=True, nullable=False)
    age = Column(Integer)
    occupation = Column(String)
    annual_income = Column(Float)
    monthly_inhand_salary = Column(Float)
    num_bank_accounts = Column(Integer)
    num_credit_cards = Column(Integer)
    interest_rate = Column(Float)  # corregido
    num_of_loan = Column(Integer)
    delay_from_due_date = Column(Integer)
    num_of_delayed_payment = Column(Integer)  # corregido
    changed_credit_limit = Column(Float)
    num_credit_inquiries = Column(Integer)
    credit_mix = Column(String)
    outstanding_debt = Column(Float)
    credit_utilization_ratio = Column(Float)
    credit_history_age = Column(Integer)
    payment_of_min_amount = Column(String)
    total_emi_per_month = Column(Float)
    amount_invested_monthly = Column(Float)
    payment_behaviour = Column(String)
    monthly_balance = Column(Float)

    last_loan_9 = Column(String)
    last_loan_8 = Column(String)
    last_loan_7 = Column(String)
    last_loan_6 = Column(String)
    last_loan_5 = Column(String)
    last_loan_4 = Column(String)
    last_loan_3 = Column(String)
    last_loan_2 = Column(String)
    last_loan_1 = Column(String)

    credit_score = Column(String)
