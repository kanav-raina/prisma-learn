const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()
const bodyParser=require('body-parser')
app.use(bodyParser.json());

app.get('/user', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})
app.post('/post', async (req, res) => {
  const { title, content, authorEmail } = req.body
  const post = await prisma.post.create({
    data: {
      title,

      published: false,
      author: { connect: { email: authorEmail } },
    },
  })
  res.json(post)
})
app.put('/publish/:id', async (req, res) => {
  const { id } = req.params
  console.log(id)
  const post = await prisma.post.update({
    where: { id },
    data: { published: true },
  })
  res.json(post)
})
app.delete('/user/:id', async (req, res) => {
  const { id } = req.params
  const user = await prisma.user.delete({
    where: {
      id,
    },
  })
  res.json(user)
})

app.listen(3000)