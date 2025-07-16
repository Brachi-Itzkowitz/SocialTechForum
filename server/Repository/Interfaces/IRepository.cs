namespace Repository.Interfaces
{
    public interface IRepository<T>
    {
        Task<T> GetById(int id);
        Task<List<T>> GetAll();
        Task<T> Add(T item);
        Task Update(int id, T item);
        Task Delete(int id);
    }
}
