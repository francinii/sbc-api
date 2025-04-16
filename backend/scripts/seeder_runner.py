import os

from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

def run_rule_seeder():
    print("Iniciando la inicialización de la tabla Rules...")

    DATABASE_URL = os.environ.get("DATABASE_URL")
    if not DATABASE_URL:
        raise ValueError("DATABASE_URL environment variable is not set.")
    engine = create_engine(DATABASE_URL)
    Session = sessionmaker(bind=engine)
    session = Session()

    try:
        # Verificar si la tabla Rules está vacía
        result = session.execute(text("SELECT COUNT(*) FROM rules"))
        count = result.scalar()
        if count == 0:
            # Leer y ejecutar el script SQL
            seed_file = os.path.join(os.path.dirname(__file__), "../data/seeds.sql")
            with open(seed_file, "r") as file:
                sql_script = file.read()

            session.execute(text(sql_script))
            session.commit()
            print("Tabla rules inicializada...")
        else:
            print("La tabla rules ya contiene datos...")
    except Exception as e:
        print(f"Error al inicializar la tabla Rules: {e}")
        session.rollback()
    finally:
        session.close()