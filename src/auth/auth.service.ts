import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Grade } from 'src/grades/grade.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.usersService.create({
      ...data,
      password: hashedPassword,
    });
  }
async login(email: string, password: string) {
  const user = await this.usersService.findByEmail(email);

  if (!user) {
    throw new UnauthorizedException('Utilisateur non trouvé');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedException('Mot de passe incorrect');
  }

  const payload = {
    sub: user.id,
    role: user.role,
    gradeId: user.gradeId,
  };

  return {
    access_token: this.jwtService.sign(payload),
    role: user.role,
    gradeId: user.gradeId, // ✅ AJOUT CRUCIAL
  };
}

}
