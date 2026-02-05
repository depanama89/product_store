import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';
// import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    // 1. On crée un pool de connexion avec le driver 'pg'
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    // 2. On initialise l'adaptateur Prisma pour PostgreSQL
    const adapter = new PrismaPg(pool);

    // 3. On passe l'adaptateur au constructeur parent
    super({ adapter });
  }

  async onModuleInit() {
    // On force la connexion ici au démarrage du module NestJS
    try {
      await this.$connect();
      console.log('✅ Connexion à la base de données établie.');
    } catch (error) {
      console.error('❌ Échec de connexion Prisma :', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
