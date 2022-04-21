import { Injectable } from '@nestjs/common';
import { LocalRepository } from '../repositories/local.repository';
import { VenuePatchResponseDto } from './dto/venue.patch.response.dto';

@Injectable()
export class LocalService {
  constructor(private readonly localRepository: LocalRepository) {}
  getAll(): Promise<any> {
    return this.localRepository.getAll();
  }

  getById(id): Promise<any> {
    return this.localRepository.getById(id);
  }

  getByQuery(query): Promise<any> {
    return this.localRepository.getByQuery(query);
  }

  add(body): Promise<any> {
    return this.localRepository.addVenue(body);
  }

  patch(id, body): Promise<VenuePatchResponseDto> {
    return this.localRepository.patchVenue(id, body);
  }
}
