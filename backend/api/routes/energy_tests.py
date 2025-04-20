import time
import psutil
from services.service import Service
from database import get_db
from fastapi import APIRouter, Depends
import json
import os
from requests import Session

from models.request_models import Applicant, MLModelBest

router = APIRouter()

@router.get("/measure/{TDP_WATTS}", description="Recibe el TDP real de tu CPU. Ej: 55")
def measure_cpu_usage(TDP_WATTS: int, db: Session = Depends(get_db)):
    process = psutil.Process()
    cpu_before = process.cpu_times()
    mem_before = process.memory_info().rss
    io_before = process.io_counters()
    net_before = psutil.net_io_counters()
    start_time = time.time()

    file_path = os.path.join(os.path.dirname(__file__), "../../tests/30_applicants.json")
    with open(file_path,"r", encoding="utf-8") as file:
      applicants_data = json.load(file)
    applicants_list = [Applicant(**applicant) for applicant in applicants_data]

    for applicant in applicants_list:
      print('\n\n\n\n\n ******** Entre al metodo')
      item: MLModelBest= applicant.convert_applicant_to_mlmodel()
      items_dict = item.model_dump()
      Service(db).call_best_ml(items_dict)
      Service(db).call_motor_inference(applicant)

    end_time = time.time()
    cpu_after = process.cpu_times()
    mem_after = process.memory_info().rss
    io_after = process.io_counters()
    net_after = psutil.net_io_counters()
    
    # ------------------ Cálculos ------------------
    number_of_applicants = len(applicants_list)
    duration_sec = end_time - start_time
    cpu_user_time = cpu_after.user - cpu_before.user
    cpu_system_time = cpu_after.system - cpu_before.system
    memory_used_bytes = mem_after - mem_before
    read_bytes = io_after.read_bytes - io_before.read_bytes
    write_bytes = io_after.write_bytes - io_before.write_bytes
    bytes_sent = net_after.bytes_sent - net_before.bytes_sent
    bytes_recv = net_after.bytes_recv - net_before.bytes_recv
    inferences_per_sec = number_of_applicants / duration_sec
    total_cpu_time = cpu_user_time + cpu_system_time

    # Estimación de energía 
    # Obtner el TDP de la maquina -----  wmic cpu get Name
    # https://www.cpubenchmark.net/cpu.php?cpu=Intel+Core+i7-13650HX&id=5253  
    # ---------------------------------------------------------------------   
    # Francini ----- 13th Gen Intel(R) Core(TM) i7-13650HX --------  55 W
    # Adolfo  ----- 
    # Jose  ----- 
    # Andres  ----- 
    # TDP_WATTS = 55 # <-- Cambia esto por el TDP real de tu CPU
    cpu_usage_ratio = total_cpu_time / duration_sec  # Ej: 0.75 → 75% de uso en el tiempo medido
    estimated_energy_joules = TDP_WATTS * cpu_usage_ratio * duration_sec  # Joules = W * s
    estimated_energy_per_inference = estimated_energy_joules / number_of_applicants


    return {
        "number_of_applicants": number_of_applicants,
        "duration_sec": f"{duration_sec:.2f} s",
        "inferences_per_sec": f"{inferences_per_sec:.2f} inf/s",
        "cpu_user_time": f"{cpu_user_time:.2f} s",
        "cpu_system_time": f"{cpu_system_time:.2f} s",
        "cpu_usage_ratio": f"{cpu_usage_ratio:.2f}",  # Esto es un porcentaje en decimal, puedes multiplicar por 100 si prefieres %
        "memory_used_bytes": f"{memory_used_bytes / (1024 ** 2):.2f} MB",
        "disk_read_bytes": f"{read_bytes / (1024 ** 2):.2f} MB",
        "disk_write_bytes": f"{write_bytes / (1024 ** 2):.2f} MB",
        "network_bytes_sent": f"{bytes_sent / 1024:.2f} KB",
        "network_bytes_recv": f"{bytes_recv / 1024:.2f} KB",
        "estimated_energy_joules": f"{estimated_energy_joules:.2f} J",
        "estimated_energy_per_inference_joules": f"{estimated_energy_per_inference:.2f} J/inf"
    }
