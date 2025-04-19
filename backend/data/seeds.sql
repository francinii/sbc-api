DO $$
DECLARE
    rule_id INTEGER;
BEGIN

DELETE FROM conditions;
DELETE FROM rules;

-- Regla 1
INSERT INTO rules (message, score_change, effect)
VALUES ('Debido al puntaje crediticio, se rechaza el crédito por alto riesgo de impago.', 0, 'danger')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'score_credito', '$lt', '0.2');

-- Regla 2
INSERT INTO rules (message, score_change, effect)
VALUES ('Debido al puntaje crediticio, no se rechaza el crédito, pero el riesgo de impago es medio.', 0, 'warning')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'score_credito', '$gt', '0.2');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'score_credito', '$lt', '0.8');

-- Regla 3
INSERT INTO rules (message, score_change, effect)
VALUES ('Debido al puntaje crediticio, se aprueba el crédito.', 0, 'success')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'score_credito', '$gt', '0.8');

-- Regla 4
INSERT INTO rules (message, score_change, effect)
VALUES ('Edad entre 14 y 19 años es de alto riesgo, se recomienda solicitar garantías adicionales.', 0, 'warning')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'edad', '$gte', '14');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'edad', '$lte', '19');

-- Regla 5
INSERT INTO rules (message, score_change, effect)
VALUES ('Edad entre 20 y 43 se encuentran en el promedio, se recomienda monitorear otros indicadores.', 0, 'info')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'edad', '$gte', '20');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'edad', '$lte', '43');

-- Regla 6
INSERT INTO rules (message, score_change, effect)
VALUES ('Mayores de 43 suele estar en el mejor promedio, este aspecto sube el puntaje crediticio.', 0, 'success')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'edad', '$gte', '44');

-- (Reglas restantes del 7 al 30 deben añadirse aquí siguiendo el mismo formato proporcionado inicialmente en el JSON original)
-- Regla 7
INSERT INTO rules (message, score_change, effect)
VALUES ('Ingresos netos menores a 1800 dólares, se recomienda disminuir el límite de crédito.', 0, 'warning')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'monthly_inhand_salary', '$lte', '1826');

-- Regla 8
INSERT INTO rules (message, score_change, effect)
VALUES ('Ingresos netos entre 1800 y 6700 dólares. Es parte del promedio, se recomienda observar otros indicadores.', 0, 'info')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'monthly_inhand_salary', '$gt', '1826');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'monthly_inhand_salary', '$lte', '6712.04');

-- Regla 9
INSERT INTO rules (message, score_change, effect)
VALUES ('Ingresos altos, apto para mejores tasas de crédito o un crédito más alto.', 0, 'success')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'monthly_inhand_salary', '$gt', '6712.04');

-- Regla 10
INSERT INTO rules (message, score_change, effect)
VALUES ('Deuda baja. Se recomienda fomentar créditos.', 0, 'success')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'outstanding_debt', '$lte', '1355');

-- Regla 11
INSERT INTO rules (message, score_change, effect)
VALUES ('Aumento en deudores estándar. Monitorear antes de definir las condiciones del crédito.', 0, 'info')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'outstanding_debt', '$gt', '1355');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'outstanding_debt', '$lte', '1624');

-- Regla 12
INSERT INTO rules (message, score_change, effect)
VALUES ('La deuda se sitúa entre 1624 y 2300. Se recomienda bajar el límite crediticio.', 0, 'warning')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'outstanding_debt', '$gt', '1624');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'outstanding_debt', '$lte', '2300');

-- Regla 13
INSERT INTO rules (message, score_change, effect)
VALUES ('La deuda se sitúa entre 2300 y 3000. Se recomienda bajar el límite crediticio.', 0, 'warning')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'outstanding_debt', '$gt', '2300');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'outstanding_debt', '$lte', '3000');

-- Regla 14
INSERT INTO rules (message, score_change, effect)
VALUES ('Deuda alta superior a 3000. Se recomienda revisar otros indicadores antes de ofrecer las condiciones del crédito.', 0, 'danger')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'outstanding_debt', '$gt', '3000');

-- Regla 15
INSERT INTO rules (message, score_change, effect)
VALUES ('Pocas tarjetas. El riesgo es bajo.', 0, 'success')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'num_credit_cards', '$lte', '3');

-- Regla 16
INSERT INTO rules (message, score_change, effect)
VALUES ('La cantidad de tarjetas de crédito es moderada. Evaluar cuidadosamente.', 0, 'info')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'num_credit_cards', '$gt', '3');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'num_credit_cards', '$lte', '7');

-- Regla 17
INSERT INTO rules (message, score_change, effect)
VALUES ('Tiene muchas tarjetas de crédito, el riesgo es considerablemente más alto.', 0, 'danger')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'num_credit_cards', '$gt', '7');

-- Regla 18
INSERT INTO rules (message, score_change, effect)
VALUES ('Solo paga el mínimo. Mayor riesgo de impago.', 0, 'warning')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'payment_of_min_amount', '$eq', 'Yes');

-- Regla 19
INSERT INTO rules (message, score_change, effect)
VALUES ('No paga el mínimo. Tiende a un buen comportamiento de pago.', 0, 'success')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'payment_of_min_amount', '$eq', 'No');

-- Regla 20
INSERT INTO rules (message, score_change, effect)
VALUES ('Inversión mensual baja o nula. Se recomienda revisar la estrategia de inversión del usuario.', 0, 'info')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'monto_inversion_mensual', '$lt', '64');


-- Regla 21
INSERT INTO rules (message, score_change, effect)
VALUES ('El usuario invierte de 64 a 130 dólares, se puede mejorar la puntuación al aumentar la inversión mensual.', 0, 'info')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'monto_inversion_mensual', '$gte', '64');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'monto_inversion_mensual', '$lt', '130');

-- Regla 22
INSERT INTO rules (message, score_change, effect)
VALUES ('Buen desempeño en inversión, pero se puede mejorar la puntuación al aumentar la inversión mensual.', 0, 'success')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'monto_inversion_mensual', '$gte', '130');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'monto_inversion_mensual', '$lt', '275');

-- Regla 23
INSERT INTO rules (message, score_change, effect)
VALUES ('Excelente inversión mensual.', 0, 'success')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'monto_inversion_mensual', '$gte', '275');

-- Regla 24
INSERT INTO rules (message, score_change, effect)
VALUES ('Poca experiencia crediticia. Se recomienda monitoreo y limitar el monto de crédito.', 0, 'warning')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'experiencia_crediticia', '$lt', '12');

-- Regla 25
INSERT INTO rules (message, score_change, effect)
VALUES ('Experiencia inicial. Se recomienda monitoreo y limitar el monto de crédito.', 0, 'info')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'experiencia_crediticia', '$gte', '12');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'experiencia_crediticia', '$lt', '37');

-- Regla 26
INSERT INTO rules (message, score_change, effect)
VALUES ('Experiencia consolidada. Se recomienda ofrecer mejores tasas y condiciones.', 0, 'success')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'experiencia_crediticia', '$gte', '37');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'experiencia_crediticia', '$lt', '61');

-- Regla 27
INSERT INTO rules (message, score_change, effect)
VALUES ('Alta experiencia. Se recomienda ofrecer beneficios exclusivos si lo permiten otros indicadores.', 0, 'success')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'experiencia_crediticia', '$gte', '61');

-- Regla 28
INSERT INTO rules (message, score_change, effect)
VALUES ('Sin préstamos activos. Puede optar por mejores condiciones.', 0, 'success')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'cantidad_prestamos_activos', '$eq', '0');

-- Regla 29
INSERT INTO rules (message, score_change, effect)
VALUES ('Un préstamo activo. Buen perfil si otros indicadores son positivos se pueden valorar mejores condiciones.', 0, 'info')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'cantidad_prestamos_activos', '$eq', '1');

-- Regla 30
INSERT INTO rules (message, score_change, effect)
VALUES ('Pocos préstamos activos. Evaluar historial antes de ofrecer condiciones.', 0, 'warning')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'cantidad_prestamos_activos', '$gte', '2');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'cantidad_prestamos_activos', '$lte', '3');

END $$;
