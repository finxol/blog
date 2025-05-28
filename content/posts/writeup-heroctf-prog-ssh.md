---
title: HeroCTF Write-Up SSHs
description: Write-up for the programming challenge "SSHs" @ HeroCTF 2022
image: /blog/heroctf.jpg
date: 2022-05-30
authors:
  - name: finxol
tags:
  - writeup
  - HeroCTF
  - prog
published: true
---

### Description

Every user can read the private rsa key of the next user. You just have to grab it, and ssh as the next. But... there
are 250 ?!?<br>
Let's automate it ! (The last user has a *flag.txt* at the root of his home directory)

The base credentials are:

<code-group>
  <code-block label="Username" active>

    user1:password123

  </code-block>
  <code-block label="Host">

    Host : xxxx.heroctf.fr
    Port : xxxx

  </code-block>
</code-group>

Format : **Hero{flag}**<br>
Author : **Log_s**


## Solution

Before doing anything else, let's just login as the base user to have a look around.

With a simple `ssh user1@xxxx.heroctf.fr` and using `password123` as the password,
we can get ssh access to the machine as `user1`.

Once logged in, we can see that in the home directory, there is an executable file called `getSSHKey`,
which simply returns the SSH key of the next user as plaintext.
We also know from the description of the challenge that there are 249 users.

With this information, we can now write a simple bash script to automate the retrieval of the SSH keys and, in turn, the flag.
(sorry not sorry Windows users)

The use of `sshpass` instead of the plain old `ssh` for the first login enables us to give the password
directly as a command argument instead of being prompted to enter it manually.<br>
The use of `1>` at the end of each command redirects the standard output (stdout not stderr) to a specified file;
here the file is used to save the key.

```bash
# Log into the first user and save the key of the next user to a file named id1
sshpass -p password123 ssh user1@chall.heroctf.fr -p 10045 "./getSSHKey" 1> id1

# For each user, log in using the previously fetched key, and save the next key in a file name idX,
# where X is the number of the current iteration
for i in {2..249}
do
	prev=id$(expr $i - 1)
	# Set the correct permissions for the ssh key
	chmod 600 $prev
	# Retrieve the next ssh key
	ssh -i "${prev}" user${i}@chall.heroctf.fr -p 10045 "./getSSHKey" 1> id${i}
done

# For the last user, instead of calling getSSHKey, we simply print the contents of flag.txt
ssh -i id249 user250@chall.heroctf.fr -p 10045 "cat flag.txt"
```

Et voilà!
We can now simply wait for the programme to execute and the flag will magically appear a few seconds later!
