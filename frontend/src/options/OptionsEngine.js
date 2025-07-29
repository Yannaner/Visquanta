class OptionsEngine {
    constructor() {
        // Enhanced options parameters that better represent real options
        this.callOption = { 
            premium: 5, 
            strikePrice: 20, 
            underlyingValue: 20, // Current "price" of the ride
            timeDecay: 0.1 // Time value decay per second
        };
        this.putOption = { 
            premium: 5, 
            strikePrice: 20, // Insurance payout amount
            underlyingValue: 20,
            timeDecay: 0.1
        };
    }

    // Calculate intrinsic value of call option
    getCallIntrinsicValue(underlyingPrice, strikePrice) {
        return Math.max(underlyingPrice - strikePrice, 0);
    }

    // Calculate intrinsic value of put option  
    getPutIntrinsicValue(underlyingPrice, strikePrice) {
        return Math.max(strikePrice - underlyingPrice, 0);
    }

    // Calculate time value remaining
    getTimeValue(timeRemaining, maxTime) {
        return Math.max(timeRemaining / maxTime, 0);
    }

    // Evaluate call option with more realistic pricing
    evaluateCallOption(weather, timeRemaining, maxTime = 20) {
        const timeValue = this.getTimeValue(timeRemaining, maxTime);
        
        if (weather === 'sunny' && timeRemaining > 0) {
            // In sunny weather, the "underlying asset" (ride access) has full value
            const currentValue = 20; // Full ride value in sunny weather
            const intrinsicValue = this.getCallIntrinsicValue(currentValue, this.callOption.strikePrice);
            return {
                action: 'exercise',
                intrinsicValue: intrinsicValue,
                timeValue: timeValue,
                totalValue: intrinsicValue + (timeValue * 2), // Time premium
                profitLoss: intrinsicValue - this.callOption.premium
            };
        } else if (weather === 'rainy' && timeRemaining > 0) {
            // In rainy weather, ride has no value (closed)
            return {
                action: 'worthless',
                intrinsicValue: 0,
                timeValue: timeValue,
                totalValue: timeValue * 2, // Only time value remains
                profitLoss: -this.callOption.premium
            };
        } else if (timeRemaining <= 0) {
            return {
                action: 'expired',
                intrinsicValue: 0,
                timeValue: 0,
                totalValue: 0,
                profitLoss: -this.callOption.premium
            };
        }
        
        // Holding the option
        const estimatedValue = weather === 'sunny' ? 15 : 5; // Estimated underlying value
        return {
            action: 'hold',
            intrinsicValue: Math.max(estimatedValue - this.callOption.strikePrice, 0),
            timeValue: timeValue,
            totalValue: Math.max(estimatedValue - this.callOption.strikePrice, 0) + (timeValue * 2),
            profitLoss: 0 // Unrealized
        };
    }

    // Evaluate put option with more realistic pricing
    evaluatePutOption(weather, timeRemaining, maxTime = 20) {
        const timeValue = this.getTimeValue(timeRemaining, maxTime);
        
        if (weather === 'rainy' && timeRemaining > 0) {
            // Rain triggers the insurance payout
            const intrinsicValue = this.putOption.strikePrice; // Full payout
            return {
                action: 'payout',
                intrinsicValue: intrinsicValue,
                timeValue: timeValue,
                totalValue: intrinsicValue,
                profitLoss: intrinsicValue - this.putOption.premium
            };
        } else if (weather === 'sunny' && timeRemaining > 0) {
            // Sunny weather means no insurance needed
            return {
                action: 'worthless',
                intrinsicValue: 0,
                timeValue: timeValue,
                totalValue: timeValue * 2,
                profitLoss: -this.putOption.premium // Will lose premium if stays sunny
            };
        } else if (timeRemaining <= 0) {
            return {
                action: 'expired',
                intrinsicValue: 0,
                timeValue: 0,
                totalValue: 0,
                profitLoss: -this.putOption.premium
            };
        }
        
        // Holding the option
        const rainProbability = 0.3; // 30% chance of rain (simplified)
        const expectedValue = rainProbability * this.putOption.strikePrice;
        return {
            action: 'hold',
            intrinsicValue: 0,
            timeValue: timeValue,
            totalValue: expectedValue * timeValue,
            profitLoss: 0 // Unrealized
        };
    }

    // Get a detailed explanation of the option
    getOptionExplanation(optionType) {
        if (optionType === 'call') {
            return {
                name: "Call Option",
                description: "Gives you the RIGHT (not obligation) to 'buy' something at a fixed price",
                analogy: "Like a reservation at a restaurant - you pay a small fee to hold your spot, but you don't have to eat there",
                benefits: ["Limited downside risk", "Unlimited upside potential", "Leverage effect"],
                risks: ["Premium can be lost", "Time decay", "May expire worthless"]
            };
        } else {
            return {
                name: "Put Option", 
                description: "Gives you the RIGHT to 'sell' something at a fixed price, or acts as insurance",
                analogy: "Like travel insurance - you pay a premium hoping you never need it, but you're protected if something goes wrong",
                benefits: ["Protection against losses", "Insurance-like properties", "Limited premium cost"],
                risks: ["Premium can be lost", "Time decay", "May expire worthless if protection not needed"]
            };
        }
    }
}

export default OptionsEngine;