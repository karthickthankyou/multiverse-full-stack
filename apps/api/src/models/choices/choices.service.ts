import { Injectable } from '@nestjs/common'
import { FindManyChoiceArgs, FindUniqueChoiceArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateChoiceInput } from './dto/create-choice.input'
import { UpdateChoiceInput } from './dto/update-choice.input'

@Injectable()
export class ChoicesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createChoiceInput: CreateChoiceInput) {
    return this.prisma.choice.create({
      data: createChoiceInput,
    })
  }

  findAll(args: FindManyChoiceArgs) {
    return this.prisma.choice.findMany(args)
  }

  findOne(args: FindUniqueChoiceArgs) {
    return this.prisma.choice.findUnique(args)
  }

  update(updateChoiceInput: UpdateChoiceInput) {
    const { id, ...data } = updateChoiceInput
    return this.prisma.choice.update({
      where: { id },
      data: data,
    })
  }

  remove(args: FindUniqueChoiceArgs) {
    return this.prisma.choice.delete(args)
  }
}
