import { Router } from 'express'

import CreateUserService from '@services/CreateUserService/CreateUserService'

const UsersRouter = Router()

UsersRouter.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      password
    } = req.body

    const createUser = new CreateUserService()
    const user = await createUser.execute({
      name,
      email,
      password
    })

    delete user.password

    return res.status(200).json(user)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
})

export default UsersRouter
