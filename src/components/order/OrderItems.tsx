import React from 'react';
import { motion } from 'framer-motion';
import { CartItem } from '@/components/cart/CartProvider';
import { getPersonalizations } from '@/utils/personalizationStorage';
import { Tag, Package2, Ruler } from 'lucide-react';

interface OrderItemsProps {
  items: CartItem[];
}

const OrderItems = ({ items }: OrderItemsProps) => {
  const personalizations = getPersonalizations();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6 mb-6"
    >
      <h2 className="text-xl font-medium mb-4 text-[#471818]">Articles commandés</h2>
      <div className="space-y-6">
        {items.map((item, index) => (
          <motion.div 
            key={`${item.id}-${index}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-gray-50">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-lg font-medium text-[#471818]">{item.name}</h3>
                  <p className="text-sm text-gray-500">Réf: {item.id.toString().padStart(6, '0')}</p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {item.size && (
                    <div className="flex items-center text-[#471818] gap-1 text-sm bg-gray-50 px-3 py-1 rounded-full">
                      <Ruler className="w-4 h-4 text-[#700100]" />
                      <span>Taille: {item.size}</span>
                    </div>
                  )}
                  {item.color && (
                    <div className="text-[#471818] flex items-center gap-1 text-sm bg-gray-50 px-3 py-1 rounded-full">
                      <Package2 className="w-4 h-4 text-[#700100]" />
                      <span>Couleur: {item.color}</span>
                    </div>
                  )}
                </div>

                {(personalizations[item.id] || item.personalization) && (
                  <div className="bg-[#F8F8F8] p-3 rounded-lg space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-[#471818]">
                      <Tag className="w-4 h-4 text-[#700100]" />
                      Personnalisation
                    </div>
                    <p className="text-sm text-gray-600">
                      {personalizations[item.id] || item.personalization}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Prix unitaire: {item.price.toFixed(2)} TND</p>
                    <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-[#700100]">
                      Total: {(item.price * item.quantity).toFixed(2)} TND
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default OrderItems;