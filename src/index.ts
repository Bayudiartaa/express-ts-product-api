import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import createError from "http-errors"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient()
const app = express()
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

app.use(express.json())

// Middleware untuk melakukan verifikasi token JWT
const verifyToken = (req: Request, res: Response, next: any) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ error: 'Failed to authenticate token' });
    }

    req.body.userId = decoded.userId;
    next();
  });
};

app.post('/api/register', async (req: Request, res: Response) => {
  try {
      const { name, username, email, password } = req.body;
  
      const hashedPassword: string = await bcrypt.hash(password, 10);
  
      const user = await prisma.user.create({
          data: {
              name,
              username,
              email,
              password: hashedPassword,  
          },
      });
      return res.status(201).json({ status: 'true', data: user});
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to register user' });
  }
});


app.post('/api/login', async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
  
      const user = await prisma.user.findUnique({ where: { username } });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (user.password === null) {
        return res.status(401).json({ error: 'Password not set' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      const token = jwt.sign({ username: user.username }, JWT_SECRET);
  
      res.json({ status: 'true', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to login' });
    }
});

app.post('/api/logout', (req: Request, res: Response) => {
  try {
    res.json({ status: 'true', message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to logout' });
  }
});

app.get('/api/product', verifyToken, async (req: Request, res: Response) => {
    const products = await prisma.product.findMany()
    return res.status(200).json({ status: 'true', data: products});
})

app.post('/api/product', verifyToken, async (req: Request, res: Response) => {
    const result = await prisma.product.create({
        data: { ...req.body }
    })
    return res.status(200).json({ status: 'true', data: result});
})
  
app.get('/api/product/:id', verifyToken, async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    })
    return res.status(200).json({ status: 'true', data: product});
})
  
app.put('/api/product/:id', verifyToken, async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        ...req.body
      }
    })
    return res.status(200).json({ status: 'true', data: product});
})
  
  
app.delete(`/api/product/:id`, verifyToken, async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await prisma.product.delete({
      where: { id: Number(id) },
    })
    return res.status(200).json({ status: 'true', data: null, message: 'Product deleted successfully' });
})

// handle 404 error
app.use((req: Request, res: Response, next: Function) => {
  next(createError(404))
})

app.listen(3000, () =>
  console.log(`⚡️[server]: Server is running at https://localhost:3000`)
)