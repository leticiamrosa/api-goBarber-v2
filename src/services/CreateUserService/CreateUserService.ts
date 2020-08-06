import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'
import User from '@models/User'

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute ({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User)

    const isUserExists = await userRepository.findOne({
      where: { email }
    })

    if (isUserExists) {
      throw new Error('Email address already used')
    }

    const hashedPassword = await hash(password, 8)

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword
    })

    await userRepository.save(user)

    return user
  }
}

export default CreateUserService
