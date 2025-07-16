import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../services/categoryService';
import { CategoryType } from '../types/category.types';

const CategorySection: React.FC = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('שגיאה בקבלת קטגוריות:', err);
        setError('שגיאה בטעינת הקטגוריות');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>טוען קטגוריות...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (categories.length === 0) {
    return <div>לא נמצאו קטגוריות.</div>;
  }

  return (
    <div>
      <h2>רשימת קטגוריות</h2>
      <ul>
        {categories.map((cat, index) => (
          <li key={index}>{cat.nameCategory}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySection;
