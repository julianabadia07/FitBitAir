# Fitbit Dashboard — Google Health API

Dashboard personal para visualizar datos de Fitbit vía Google Fitness REST API.

---

## Estructura del proyecto

```
fitbit-dashboard/
├── public/
│   ├── index.html       ← Dashboard principal
│   └── callback.html    ← Recibe el token de Google
├── api/
│   └── auth-url.js      ← Genera la URL de OAuth (Vercel Function)
├── vercel.json          ← Configuración de rutas
└── README.md
```

---

## Paso 1 — Google Cloud Console

1. Ve a https://console.cloud.google.com
2. Crea un proyecto nuevo (ej: "Mi Fitbit Dashboard")
3. En el menú izquierdo: **APIs y servicios → Biblioteca**
4. Busca **"Fitness API"** → Actívala
5. También busca **"Google Health API"** → Actívala (si aparece en tu región)

---

## Paso 2 — Pantalla de consentimiento OAuth

1. **APIs y servicios → Pantalla de consentimiento OAuth**
2. Tipo: **Externo** → Crear
3. Rellena:
   - Nombre de la app: `Mi Fitbit Dashboard` (o lo que quieras)
   - Email de soporte: tu email
4. En **Usuarios de prueba** → añade tu cuenta de Google (la misma del Fitbit)
5. Guarda

---

## Paso 3 — Crear credenciales OAuth

1. **APIs y servicios → Credenciales → Crear credencial → ID de cliente OAuth 2.0**
2. Tipo de aplicación: **Aplicación web**
3. En **URI de redireccionamiento autorizados** agrega:
   ```
   https://TU-PROYECTO.vercel.app/callback
   ```
   *(lo sabrás después de desplegar en Vercel)*
4. Crea → copia el **Client ID**

---

## Paso 4 — Desplegar en Vercel

1. Sube esta carpeta a GitHub (repositorio nuevo, puede ser privado)
2. Ve a https://vercel.com → New Project → importa tu repositorio
3. En **Environment Variables** agrega:
   ```
   GOOGLE_CLIENT_ID   =  tu-client-id.apps.googleusercontent.com
   NEXT_PUBLIC_URL    =  https://tu-proyecto.vercel.app
   ```
4. Deploy

---

## Paso 5 — Actualizar el Redirect URI

Una vez que Vercel te dé la URL final:
1. Vuelve a Google Cloud → Credenciales → tu app OAuth
2. Actualiza el URI de redirección con la URL real de Vercel:
   ```
   https://tu-proyecto.vercel.app/callback
   ```

---

## Uso

1. Abre `https://tu-proyecto.vercel.app`
2. Clic en "Conectar con Google"
3. Autoriza los permisos de fitness
4. ¡Listo! Verás tus datos de los últimos 7 días

---

## Datos que muestra

| Métrica | Fuente |
|---|---|
| Pasos | Google Fitness API - step_count.delta |
| Calorías activas | Google Fitness API - calories.expended |
| Frecuencia cardíaca | Google Fitness API - heart_rate.bpm |
| Sueño | Google Fitness API - sleep.segment |

---

## Notas

- El token dura **1 hora**. Después debes volver a conectar.
- Los datos **no se guardan en ningún servidor** — solo en la memoria del navegador (sessionStorage).
- Si el Fitbit no sincronizó recientemente, puede que algunos datos aparezcan vacíos.
