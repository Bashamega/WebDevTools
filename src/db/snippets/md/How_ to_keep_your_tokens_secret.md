<!--
--title: How to keep your tokens secret?
--summary: Hello:)
In this snippet we will see how to keep tokens secret.
-->
Hello:)
In this snippet we will see how to keep tokens secret.
## Adding it to your project
### Step 1
Create a file called `.env`

### Step 1
Add values in it.
All caps.
if your js project is in next js then start the key with `NEXT_PUBLIC_`
example:
```env
USERNAME = "basha coder"
```
### Step 3
To add it in your js project file yu need to make a variable for it like this:
```js
const username = process.env.USERNAME;
```
Now you have inserted the value into your project, you can use it anywhere by calling the username constant.

## Uploading it to Github(optional)
### Making sure that the `.env` is not on github
Now you need to create a `.gitignore` to exclude the `.env`, and write in it

```
.env
```
### Uploading the files
Then just upload the code to your GitHub repo
### Adding the secret
Go to the settings of the repo, then click on Secrets and Variables then Actions, then click new secret and add your key and value.
If you are using another service for hosting like vercel go to the project setting and go in environment and add from there
Video: https://www.youtube.com/watch?v=9iT86nC2Ubs