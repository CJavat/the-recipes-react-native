# The Recipes | React-Native

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://reactnative.dev/img/header_logo.svg" width="200" alt="Nest Logo" /></a>
</p>

## Dev

1. Copiar el archivo `.env.template` y renombrarlo a `.env` y configurar las variables de entorno.

2. Instalar Dependencias

```
npm install
```

3. Ejecutar el siguiente comando y revisar que hace falta configurar:

```
npx react-native doctor
```

4. Correr el proyecto en modo desarrollo.

```
npm run android
```

## Configurar ENVs

1. Para obtener el **API_URL_ANDROID** primero abrir el **CMD** y ejecutar `ipconfig`, esa IP agregarla seguido del :3000. Ejemplo

```
http://192.168.0.15:3000
```

2.Para obtener el **API_URL_IOS** es el `http://localhost:3000`

## Generación de la versión AAB

1. Generar las llaves privadas

```
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. Editar el archivo `~/.gradle/gradle.properties` o `android/gradle.properties`. (Reemplazar los `*****` por la contraseña).

```
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

3. Editar el archivo `android/app/build.gradle` y agregar lo siguiente:

```
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release { // Esto es lo que se debe de agregar.
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release // Esto también, cambiarlo a release.
        }
    }
}
```

4. Ahora ejecutar `npx react-native build-android --mode=release` para la generación de la versión **AAB**. (El arhivo se genera en la ruta `android/app/build/outputs/bundle/release/app-release.aab`)
5. Probar la versión **AAB** en el dispositvo o emulador.

```
npm run android -- --mode="release"
```

## Generar APK

1. Generar las llaves privadas

```
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. Editar el archivo `~/.gradle/gradle.properties` o `android/gradle.properties`. (Reemplazar los `*****` por la contraseña).

```
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

3. Editar el archivo `android/app/build.gradle` y agregar lo siguiente:

```
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release { // Esto es lo que se debe de agregar.
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release // Esto también, cambiarlo a release.
        }
    }
}
```

4. Generar la **APK** (Se guardará en `android/app/build/outputs/apk/release/app-release.apk`)

```
cd android
./gradlew assembleRelease
```

5. Instalar esa **APK** en cualquier dispositivo.
