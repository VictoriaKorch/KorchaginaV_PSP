export class DayInfoCard {
    constructor(data) {
        this.data = data;
    }

    render() {
        return `
            <div class="day-card" style="background: white; border-radius: 24px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border: 1px solid #f0f0f0;">
                <h2 style="color: #333; font-weight: 600; margin-bottom: 5px;">${this.data.name}</h2>
                
                <div style="font-size: 4rem; text-align: center; margin: 10px 0;">${this.data.icon}</div>
                
                <div style="font-size: 3rem; font-weight: 600; color: #333; text-align: center;">${this.data.value}${this.data.unit}</div>
                <div style="color: #666; text-align: center; margin-bottom: 20px;">${this.data.description}</div>
                
                <div style="margin-bottom: 20px;">
                    <p style="color: #666; line-height: 1.6;">${this.data.detail}</p>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 30px;">
                    ${this.data.details.map(detail => `
                        <div style="background: #f8f9fa; padding: 10px; border-radius: 10px;">
                            <div style="color: #999; font-size: 0.9rem;">${detail.label}</div>
                            <div style="font-weight: 600; color: #333;">${detail.value}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px;">
                    <div style="background: white; padding: 15px; border-radius: 10px; border: 1px solid #f0f0f0;">
                        <div style="color: #333; font-size: 0.9rem; margin-bottom: 5px; font-weight: normal;">Значение - палиндром:</div>
                        <div style="font-weight: bold; color: #333; font-size: 1rem;">${this.data.isPalindrome ? 'Да' : 'Нет'}</div>
                    </div>
                    <div style="background: white; padding: 15px; border-radius: 10px; border: 1px solid #f0f0f0;">
                        <div style="color: #333; font-size: 0.9rem; margin-bottom: 5px; font-weight: normal;">Σ диагоналей матрицы значений:</div>
                        <div style="font-weight: bold; color: #333; font-size: 1rem;">${this.data.diagonalSum}</div>
                    </div>
                </div>
            </div>
        `;
    }
}