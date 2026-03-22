export class DayInfoCard {
    constructor(data) {
        this.data = data;
    }

    render() {
        const isWeekend = (this.data.day === "Суббота" || this.data.day === "Воскресенье");
        const dayColor = isWeekend ? '#ff4444' : '#333';

        return `
            <div class="day-card" style="background: white; border-radius: 24px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border: 1px solid #f0f0f0;">
                <h2 style="color: ${dayColor}; font-weight: 600; margin-bottom: 5px;">${this.data.day}</h2>
                <div style="color: #666; margin-bottom: 20px;">${this.data.date}</div>
                
                <div style="font-size: 4rem; text-align: center; margin: 10px 0;">${this.data.icon}</div>
                
                <div style="font-size: 3rem; font-weight: 600; color: #333; text-align: center;">${this.data.temp}</div>
                <div style="color: #666; text-align: center;">Ощущается как ${this.data.feelsLike}</div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 30px;">
                    <div style="background: #f8f9fa; padding: 10px; border-radius: 10px;">
                        <div style="color: #999; font-size: 0.9rem;">Ветер</div>
                        <div style="font-weight: 600;">${this.data.wind}</div>
                    </div>
                    <div style="background: #f8f9fa; padding: 10px; border-radius: 10px;">
                        <div style="color: #999; font-size: 0.9rem;">Влажность</div>
                        <div style="font-weight: 600;">${this.data.humidity}</div>
                    </div>
                    <div style="background: #f8f9fa; padding: 10px; border-radius: 10px;">
                        <div style="color: #999; font-size: 0.9rem;">Давление</div>
                        <div style="font-weight: 600;">${this.data.pressure}</div>
                    </div>
                    <div style="background: #f8f9fa; padding: 10px; border-radius: 10px;">
                        <div style="color: #999; font-size: 0.9rem;">Восход/Закат</div>
                        <div style="font-weight: 600;">${this.data.sunrise} / ${this.data.sunset}</div>
                    </div>
                </div>
            </div>
        `;
    }
}