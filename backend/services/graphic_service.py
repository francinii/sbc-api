import numpy as np
import pandas as pd

from models.graphic_models import BarData, GraphicResponseModel, LineData

class GraphicService:
    def __init__(self):
        self.df = pd.read_csv("data/clean_data.csv")  # Solo carga

    def summarize_decile_analysis(self, df, col, decile_col_name, target_col_string, num_bins=10):
        df = df.copy()
        df[decile_col_name] = pd.qcut(df[col], q=num_bins, labels=False, duplicates='drop')
        bin_edges = pd.qcut(df[col], q=num_bins, retbins=True, duplicates='drop')[1]
        decile_min = [round(bin_edges[i], 2) for i in range(len(bin_edges) - 1)]
        decile_max = [round(bin_edges[i + 1], 2) for i in range(len(bin_edges) - 1)]
        decile_counts = df[decile_col_name].value_counts().sort_index()
        total_count = len(df)
        decile_proportions = decile_counts / total_count
        target_counts = df.groupby(decile_col_name)[target_col_string].value_counts().unstack(fill_value=0)
        target_props = target_counts.div(target_counts.sum(axis=1), axis=0)
        summary_df = pd.DataFrame({
            'Decile_Min': decile_min,
            'Decile_Max': decile_max,
            'Decile_Count': decile_counts,
            'Decile_Proportion': decile_proportions
        })
        for col_name in target_counts.columns:
            summary_df[f'count_{col_name}'] = target_counts[col_name]
        for col_name in target_props.columns:
            summary_df[f'prop_{col_name}'] = target_props[col_name]
        summary_df.index.name = decile_col_name
        return {
            "df_deciles": df,
            "decile_summary": summary_df.reset_index()
        }

    def run_decile_analysis(self, col, target_col_string):
        df = self.df
        decile_col_name = col + '_Decile'
        self.col = col
        self.decile_col_name = decile_col_name
        analysis_summary = self.summarize_decile_analysis(df, col, decile_col_name, target_col_string)
        self.df_deciles = analysis_summary["df_deciles"]
        self.deciles_summary = analysis_summary["decile_summary"]


    def graphic_template(self, col=None, title=None, description=None):
        self.run_decile_analysis(col=col, target_col_string='Credit_Mix')
        df = self.deciles_summary
        labelx = df[self.decile_col_name].tolist()
        decile_count = df["Decile_Count"].tolist()
        prop_bad = df.get("prop_Bad", [0]*len(labelx)).tolist()
        prop_good = df.get("prop_Good", [0]*len(labelx)).tolist()
        prop_standard = df.get("prop_Standard", [0]*len(labelx)).tolist()
        return GraphicResponseModel(
            id=1,
            labelx=labelx,
            bar=BarData(name="Decile_Count", data=decile_count),
            lines=[
                LineData(name="prop_Bad", data=prop_bad, color="red"),
                LineData(name="prop_Good", data=prop_good, color="green"),
                LineData(name="prop_Standard", data=prop_standard, color="brown"),
            ],
            title=title,
            description=description,
            is_categorical=False,
        )

    def graphic_01(self):
        col='Monthly_Inhand_Salary'
        title=f"Proportion of Credit Score Categories by {col}"
        description="Muestra cómo se distribuyen las proporciones de tipos de crédito por deciles."
        return self.graphic_template(col, title, description)

    def graphic_02(self):
        col='Num_Credit_Card'
        title=f"Proportion of Credit Score Categories by {col}"
        description="Muestra cómo se distribuyen las proporciones de tipos de crédito por deciles."
        return self.graphic_template(col, title, description)


    def graphic_03(self):
        col='Num_of_Loan'
        title=f"Proportion of Credit Score Categories by {col}"
        description="Muestra cómo se distribuyen las proporciones de tipos de crédito por deciles."
        return self.graphic_template(col, title, description)
    

    def graphic_04(self):
        col='Outstanding_Debt'
        title=f"Proportion of Credit Score Categories by {col}"
        description="Muestra cómo se distribuyen las proporciones de tipos de crédito por deciles."
        return self.graphic_template(col, title, description)
    

    def graphic_05(self):
        col='Outstanding_Debt'
        title=f"Proportion of Credit Score Categories by {col}"
        description="Muestra cómo se distribuyen las proporciones de tipos de crédito por deciles."
        return self.graphic_template(col, title, description)