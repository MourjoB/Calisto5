import React, { useState } from 'react';
import './Calculator.css'; // Import the CSS file

const QuoteCalculator = () => {
    const [coffeeType, setCoffeeType] = useState('spray-dried');
    const [blendRatio, setBlendRatio] = useState('100-pure');
    const [quantity, setQuantity] = useState(1);

    const baseCosts = {
        'spray-dried': {
            '100-pure': 710,
            '70-30': 560,
            '51-49': 590
        },
        'algo-dried': {
            '100-pure': 740,
            '70-30': 590,
            '51-49': 620
        }
    };

    const marginTiers = [
        { min: 0, max: 10, margin: 0.30 },
        { min: 10, max: 50, margin: 0.27 },
        { min: 50, max: 200, margin: 0.24 },
        { min: 200, max: 500, margin: 0.21 },
        { min: 500, max: 1500, margin: 0.16 },
        { min: 1500, max: 5000, margin: 0.13 },
        { min: 5000, max: 20000, margin: 0.10 },
        { min: 20000, max: Infinity, margin: 0.07 }
    ];

    const getCurrentTier = (qty) => {
        return marginTiers.find(tier => qty > tier.min && qty <= tier.max);
    };

    const calculatePriceWithMargin = (cost, margin) => {
        return cost / (1 - margin);
    };

    const calculateTotal = () => {
        const baseCost = baseCosts[coffeeType][blendRatio];
        const tier = getCurrentTier(quantity);
        const pricePerKg = calculatePriceWithMargin(baseCost, tier.margin);
        return (pricePerKg * quantity).toFixed(2);
    };

    const getCurrentPrice = () => {
        const baseCost = baseCosts[coffeeType][blendRatio];
        const tier = getCurrentTier(quantity);
        return calculatePriceWithMargin(baseCost, tier.margin).toFixed(2);
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        }
    };

    const getTierPrices = () => {
        const baseCost = baseCosts[coffeeType][blendRatio];
        return marginTiers.map(tier => ({
            ...tier,
            price: calculatePriceWithMargin(baseCost, tier.margin).toFixed(2)
        }));
    };

    return (
        <div className="quote-calculator">
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h2 className="title">
                            <span className="icon">🧮</span> {/* Use an emoji or replace with your own SVG */}
                            Quick Quote Calculator
                        </h2>
                        <p className="subtitle">
                            Get an instant price estimate for your wholesale coffee order
                        </p>
                    </div>

                    <div className="card-body">
                        <div className="form-group">
                            <label>Coffee Type</label>
                            <select value={coffeeType} onChange={(e) => setCoffeeType(e.target.value)}>
                                <option value="spray-dried">Spray Dried</option>
                                <option value="algo-dried">Algo Dried</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Blend Ratio</label>
                            <select value={blendRatio} onChange={(e) => setBlendRatio(e.target.value)}>
                                <option value="100-pure">100% Pure</option>
                                <option value="70-30">70:30 Blend</option>
                                <option value="51-49">51:49 Blend</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Quantity (Kgs)</label>
                            <input type="number" min="1" value={quantity} onChange={handleQuantityChange} />
                        </div>

                        <div className="price-tiers">
                            <h3>Price Tiers</h3>
                            <div className="tier-list">
                                {getTierPrices().map(tier => (
                                    <div key={tier.min}>
                                        {tier.min + 1}-{tier.max === Infinity ? '20000+' : tier.max} kg: ₹{tier.price}/kg
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="price-display">
                            <h3>Estimated Total</h3>
                            <p>₹{getCurrentPrice()} per kg × {quantity} kg</p>
                            <h1>₹{calculateTotal()}</h1>
                        </div>

                        <div className="actions">
                            <button className="btn-primary">Request Custom Quote</button>
                            <button className="btn-secondary">Save Estimate</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuoteCalculator;
