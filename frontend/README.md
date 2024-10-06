```powershell
cd D:\Project\backend\frontend\build
xcopy /E /I . D:\Project\backend\src\main\resources\static\
```

### 4. **Verify the Files in Static**
After copying, check the contents of your `static` directory to ensure all files are present directly in it:

```powershell
cd D:\Project\backend\src\main\resources\static
dir
```

You should see the following files without any extra `static` folder:

- asset-manifest.json
- favicon.ico
- index.html
- logo192.png
- logo512.png
- manifest.json
- robots.txt

### 5. **Rebuild Your Spring Boot Application**
Once everything is in place, rebuild your Spring Boot application:

```bash
cd D:\Project\backend
./mvnw clean package
```

### 6. **Deploy to Azure**
Finally, deploy the newly built application to Azure.

If you encounter any issues during these steps, let me know, and I can help troubleshoot further!