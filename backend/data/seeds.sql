DO $$
DECLARE
    rule_id INTEGER;
BEGIN

-- Regla 1
INSERT INTO rules (message, score_change, effect)
VALUES ('Se recomienda reducir otras deudas antes de solicitar crédito.', 0, 'warning')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'cuota_mensual_total', '$gt', '0.2');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'score_credito', '$gte', '0.4');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'score_credito', '$lte', '0.6');

-- Regla 2
INSERT INTO rules (message, score_change, effect)
VALUES ('Acceso a mejores tasas de interés.', 0, 'good')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'deuda_total', '$lt', '0.5');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'cuota_mensual_total', '$lt', '0.1');

-- Regla 3
INSERT INTO rules (message, score_change, effect)
VALUES ('Evaluar caso detalladamente antes de tomar una decisión.', 0, 'neutral')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'ocupacion', '=', 'Riesgo Alto');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'meses_trabajando', '$gte', '24');

-- Regla 4
INSERT INTO rules (message, score_change, effect)
VALUES ('Rechazo del crédito debido a alta cuota mensual.', 0, 'bad')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'cuota_mensual_total', '$gt', '0.3');

-- Regla 5
INSERT INTO rules (message, score_change, effect)
VALUES ('Rechazo automático por historial crediticio bajo y poca estabilidad laboral.', 0, 'bad')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'meses_trabajando', '$lt', '6');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'score_credito', '$lt', '0.4');

-- Regla 6
INSERT INTO rules (message, score_change, effect)
VALUES ('Requiere mayor evaluación financiera antes de rechazar.', 0, 'warning')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'ocupacion', '=', 'Riesgo Alto');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'meses_trabajando', '$lt', '6');

-- Regla 7
INSERT INTO rules (message, score_change, effect)
VALUES ('Revisión adicional necesaria antes de aprobar crédito.', 0, 'neutral')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'meses_trabajando', '$gte', '6');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'meses_trabajando', '$lt', '24');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'ocupacion', '=', 'Riesgo Medio');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'score_credito', '$gte', '0.4');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'score_credito', '$lte', '0.6');

-- Regla 8
INSERT INTO rules (message, score_change, effect)
VALUES ('Aprobación con condiciones favorables.', 0, 'good')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'score_credito', '$gt', '0.7');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'deuda_total', '$lt', '0.5');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'cuota_mensual_total', '$lt', '0.2');

-- Regla 9
INSERT INTO rules (message, score_change, effect)
VALUES ('Evaluar alternativas de crédito con garantías adicionales.', 0, 'neutral')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'score_credito', '$lt', '0.4');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'cuota_mensual_total', '$lt', '0.1');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'meses_trabajando', '$gte', '24');

-- Regla 10
INSERT INTO rules (message, score_change, effect)
VALUES ('Aprobación automática del crédito.', 0, 'good')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'ocupacion', '=', 'Riesgo Bajo');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'meses_trabajando', '$gte', '24');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'score_credito', '$gt', '0.7');

-- Regla 11
INSERT INTO rules (message, score_change, effect)
VALUES ('Establecer límite de crédito reducido.', 0, 'warning')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'ocupacion', '=', 'Riesgo Medio');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'score_credito', '$gte', '0.4');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'score_credito', '$lte', '0.6');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'deuda_total', '$gt', '0.5');

-- Regla 12
INSERT INTO rules (message, score_change, effect)
VALUES ('Rechazo del crédito por alta deuda y bajo score.', 0, 'bad')
RETURNING id INTO rule_id;
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'ocupacion', '=', 'Riesgo Alto');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'deuda_total', '$gt', '1.0');
INSERT INTO conditions (rule_id, field, operator, value) VALUES (rule_id, 'score_credito', '$lt', '0.4');

END $$;
