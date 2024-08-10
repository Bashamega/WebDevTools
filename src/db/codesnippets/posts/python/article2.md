# Get the date of creation of a file

You can easily get it by this following code:

```python
import os
print("Date created" + time.ctime(os.path.getctime(file_dr)))
```
