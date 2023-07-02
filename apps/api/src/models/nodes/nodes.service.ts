import { Injectable } from '@nestjs/common'
import { FindManyNodeArgs, FindUniqueNodeArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateNodeInput } from './dto/create-node.input'
import { UpdateNodeInput } from './dto/update-node.input'

@Injectable()
export class NodesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createNodeInput: CreateNodeInput) {
    return this.prisma.node.create({
      data: createNodeInput,
    })
  }

  findAll(args: FindManyNodeArgs) {
    return this.prisma.node.findMany(args)
  }

  findOne(args: FindUniqueNodeArgs) {
    return this.prisma.node.findUnique(args)
  }

  update(updateNodeInput: UpdateNodeInput) {
    const { id, ...data } = updateNodeInput
    return this.prisma.node.update({
      where: { id },
      data: data,
    })
  }

  remove(args: FindUniqueNodeArgs) {
    return this.prisma.node.delete(args)
  }
}
