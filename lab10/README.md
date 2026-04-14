# Lab 9 — Django REST Framework

KBTU Web Development

---

## What this lab covers (upgrade from Lab 8)
- Installing and configuring `djangorestframework`
- `ModelSerializer` for Category and Product
- `ModelViewSet` for full CRUD automatically
- `DefaultRouter` to register ViewSets
- Custom `@action` for `/categories/<id>/products/`
- Registering models in Django Admin with `@admin.register`
- Seeding database with 4 categories + 20 products
- Testing all endpoints with a Postman collection

---

## Project Structure

```
Lab9/
├── shop_back/
│   ├── settings.py         ← rest_framework added to INSTALLED_APPS
│   ├── urls.py
│   └── wsgi.py
├── api/
│   ├── migrations/
│   │   └── 0001_initial.py
│   ├── models.py           ← same as Lab 8
│   ├── serializers.py      ← NEW: CategorySerializer + ProductSerializer
│   ├── views.py            ← NEW: CategoryViewSet + ProductViewSet
│   ├── urls.py             ← NEW: DefaultRouter
│   └── admin.py            ← NEW: @admin.register decorators
├── manage.py
├── seed_data.py            ← adds 4 categories + 20 products
├── requirements.txt        ← Django + djangorestframework
├── .gitignore
├── OnlineShopAPI.postman_collection.json
└── README.md
```

---

## Setup

```bash
# 1. Create & activate virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux

# 2. Install dependencies (Django + DRF)
pip install -r requirements.txt

# 3. Run migrations
python manage.py migrate

# 4. Seed 4 categories + 20 products
python seed_data.py

# 5. Create superuser for admin panel
python manage.py createsuperuser

# 6. Start server
python manage.py runserver
```

---

## All API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/categories/` | List all categories |
| POST | `/api/categories/` | Create category |
| GET | `/api/categories/<id>/` | Get category by ID |
| PUT | `/api/categories/<id>/` | Update category |
| DELETE | `/api/categories/<id>/` | Delete category |
| GET | `/api/categories/<id>/products/` | Products by category |
| GET | `/api/products/` | List all products |
| POST | `/api/products/` | Create product |
| GET | `/api/products/<id>/` | Get product by ID |
| PUT | `/api/products/<id>/` | Update product |
| DELETE | `/api/products/<id>/` | Delete product |

---

## Admin Panel

`http://127.0.0.1:8000/admin/` — login with your superuser credentials.

---

## Postman

Import `OnlineShopAPI.postman_collection.json` into Postman.
- **Categories** folder — 6 requests
- **Products** folder — 5 requests
- **Total** — 11 requests

---

## POST / PUT Request Body Examples

**Category:**
```json
{
  "name": "Electronics"
}
```

**Product:**
```json
{
  "name": "iPhone 15 Pro",
  "price": 999.99,
  "description": "Apple flagship smartphone.",
  "count": 50,
  "is_active": true,
  "category": 1
}
```

---

## Key Difference from Lab 8

| | Lab 8 | Lab 9 |
|--|-------|-------|
| Views | `JsonResponse` functions | `ModelViewSet` classes |
| URLs | Manual `path()` patterns | `DefaultRouter` |
| Serialization | Manual dict building | `ModelSerializer` |
| Methods | GET only | GET, POST, PUT, DELETE |
| Admin | `admin.site.register()` | `@admin.register` decorator |
