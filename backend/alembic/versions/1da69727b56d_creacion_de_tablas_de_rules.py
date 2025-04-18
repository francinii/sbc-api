"""creacion de tablas de rules

Revision ID: 1da69727b56d
Revises: fef991ad4dc0
Create Date: 2025-04-11 04:44:04.271705

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1da69727b56d'
down_revision: Union[str, None] = 'fef991ad4dc0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('rules',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('message', sa.String(), nullable=False),
    sa.Column('score_change', sa.Float(), nullable=True),
    sa.Column('effect', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('conditions',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('rule_id', sa.Integer(), nullable=False),
    sa.Column('field', sa.String(), nullable=False),
    sa.Column('operator', sa.String(), nullable=False),
    sa.Column('value', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['rule_id'], ['rules.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    
    op.drop_table('conditions')
    op.drop_table('rules')
    # ### end Alembic commands ###
