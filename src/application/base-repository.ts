export default interface IBaseRepository<T> {
    save(obj: T): Promise<T>;
    update(obj: T): Promise<T>;
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    deleteById(id: string): Promise<boolean>;
}
