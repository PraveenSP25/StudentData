"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const chalk = require("chalk");
const express_rate_limit_1 = require("express-rate-limit");
const app_module_1 = require("./app.module");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule, {
            cors: true,
        });
        app.use((0, express_rate_limit_1.default)({
            windowMs: 1000 * 60 * 60,
            max: 1000,
            message: '⚠️  Too many requests created from this IP, please try again after an hour',
        }));
        const options = new swagger_1.DocumentBuilder()
            .setTitle('Student API')
            .setDescription('API for managing students')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, options);
        swagger_1.SwaggerModule.setup('/', app, document, {
            swaggerOptions: { docExpansion: 'none', port: 4000 },
        });
        common_1.Logger.log('Mapped {/, GET} Swagger API route', 'RouterExplorer');
        await app.listen(4000);
        process.env.NODE_ENV !== 'production'
            ? common_1.Logger.log(`🚀  Server ready at http://localhost:${chalk
                .hex('#DEADED')
                .bold(`${4000}`)}`, 'Bootstrap', false)
            : common_1.Logger.log(`🚀  Server is listening on port ${chalk
                .hex('#87e8de')
                .bold(`${4000}`)}`, 'Bootstrap', false);
    }
    catch (error) {
        common_1.Logger.error(`❌  Error starting server - ${error}`, '', 'Bootstrap', false);
        process.exit();
    }
}
bootstrap().catch((e) => {
    common_1.Logger.error(`❌  Error starting server - ${e}`, '', 'Bootstrap', false);
    throw e;
});
//# sourceMappingURL=main.js.map