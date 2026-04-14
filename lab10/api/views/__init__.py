# ─────────────────────────────────────────────────────────────
#  api/views/__init__.py
#
#  This file controls which implementation level is ACTIVE.
#  To switch levels, change the import line below.
#
#  Level 2 — FBV:
#    from api.views.fbv import products_list, product_detail
#
#  Level 3 — CBV:
#    from api.views.cbv import ProductListAPIView, ProductDetailAPIView
#
#  Level 4 — Mixins:
#    from api.views.mixins import ProductListAPIView, ProductDetailAPIView
#
#  Level 5 — Generics (ACTIVE):
#    from api.views.generics import ...
#
#  All levels expose the same API — just different internal code!
# ─────────────────────────────────────────────────────────────

# ✅ Level 5 active — Generic Views
from api.views.generics import (
    ProductListAPIView,
    ProductDetailAPIView,
    CategoryListAPIView,
    CategoryDetailAPIView,
    CategoryProductsAPIView,
)
