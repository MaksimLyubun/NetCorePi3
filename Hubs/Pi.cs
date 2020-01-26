using Microsoft.AspNetCore.SignalR;
using System.Threading;
using System.Threading.Tasks;
using System.Device.Gpio;

namespace Pi3.Hubs
{
    public class Pi : Hub
    {
        public async Task Status(int pin)
        {
            GpioController controller;

            controller = new GpioController();

            controller.OpenPin(pin, PinMode.Input);

            string methodName = "messageReceived" + pin;

            await Clients.All.SendAsync(methodName, controller.Read(pin).ToString());
        }
    }
}
