import * as assert from 'assert';
import { IMock, It, Mock, Times } from 'typemoq';
import { AddFolderComponent } from '../app/components/add-folder/add-folder.component';
import { Desktop } from '../app/core/io/desktop';
import { Logger } from '../app/core/logger';
import { Folder } from '../app/data/entities/folder';
import { BaseDialogService } from '../app/services/dialog/base-dialog.service';
import { BaseFolderService } from '../app/services/folder/base-folder.service';
import { BaseTranslatorService } from '../app/services/translator/base-translator.service';

describe('AddFolderComponent', () => {
    describe('constructor', () => {
        it('Should provide a list of folders', () => {
            // Arrange
            const desktopMock: IMock<Desktop> = Mock.ofType<Desktop>();
            const translatorServiceMock: IMock<BaseTranslatorService> = Mock.ofType<BaseTranslatorService>();
            const folderServiceMock: IMock<BaseFolderService> = Mock.ofType<BaseFolderService>();
            const dialogServiceMock: IMock<BaseDialogService> = Mock.ofType<BaseDialogService>();
            const loggerMock: IMock<Logger> = Mock.ofType<Logger>();
            const addFolderComponent: AddFolderComponent = new AddFolderComponent(
                desktopMock.object,
                translatorServiceMock.object,
                folderServiceMock.object,
                dialogServiceMock.object,
                loggerMock.object);

            // Act
            // Assert
            assert.ok(addFolderComponent.folders);
        });
    });
    describe('addFolderAsync', () => {
        it('Should get translated text for the open folder dialog', async () => {
            // Arrange
            const desktopMock: IMock<Desktop> = Mock.ofType<Desktop>();
            const translatorServiceMock: IMock<BaseTranslatorService> = Mock.ofType<BaseTranslatorService>();
            const folderServiceMock: IMock<BaseFolderService> = Mock.ofType<BaseFolderService>();
            const dialogServiceMock: IMock<BaseDialogService> = Mock.ofType<BaseDialogService>();
            const loggerMock: IMock<Logger> = Mock.ofType<Logger>();
            const addFolderComponent: AddFolderComponent = new AddFolderComponent(
                desktopMock.object,
                translatorServiceMock.object,
                folderServiceMock.object,
                dialogServiceMock.object,
                loggerMock.object);

            // Act
            await addFolderComponent.addFolderAsync();

            // Assert
            translatorServiceMock.verify(x => x.getAsync('Pages.Welcome.Music.SelectFolder'), Times.exactly(1));
        });

        it('Should allow selecting for a folder on the computer', async () => {
            // Arrange
            const desktopMock: IMock<Desktop> = Mock.ofType<Desktop>();
            const translatorServiceMock: IMock<BaseTranslatorService> = Mock.ofType<BaseTranslatorService>();
            const folderServiceMock: IMock<BaseFolderService> = Mock.ofType<BaseFolderService>();
            const dialogServiceMock: IMock<BaseDialogService> = Mock.ofType<BaseDialogService>();
            const loggerMock: IMock<Logger> = Mock.ofType<Logger>();
            const addFolderComponent: AddFolderComponent = new AddFolderComponent(
                desktopMock.object,
                translatorServiceMock.object,
                folderServiceMock.object,
                dialogServiceMock.object,
                loggerMock.object);

            translatorServiceMock.setup(x => x.getAsync('Pages.Welcome.Music.SelectFolder')).returns(async () => 'Select a folder');

            // Act
            await addFolderComponent.addFolderAsync();

            // Assert
            desktopMock.verify(x => x.showSelectFolderDialogAsync('Select a folder'), Times.exactly(1));
        });

        it('Should add a folder with the selected path to the database if the path is not empty', async () => {
            // Arrange
            const desktopMock: IMock<Desktop> = Mock.ofType<Desktop>();
            const translatorServiceMock: IMock<BaseTranslatorService> = Mock.ofType<BaseTranslatorService>();
            const folderServiceMock: IMock<BaseFolderService> = Mock.ofType<BaseFolderService>();
            const dialogServiceMock: IMock<BaseDialogService> = Mock.ofType<BaseDialogService>();
            const loggerMock: IMock<Logger> = Mock.ofType<Logger>();
            const addFolderComponent: AddFolderComponent = new AddFolderComponent(
                desktopMock.object,
                translatorServiceMock.object,
                folderServiceMock.object,
                dialogServiceMock.object,
                loggerMock.object);

            translatorServiceMock.setup(x => x.getAsync('Pages.Welcome.Music.SelectFolder')).returns(async () => 'Select a folder');
            desktopMock.setup(x => x.showSelectFolderDialogAsync('Select a folder')).returns(async () => '/home/me/Music');

            // Act
            await addFolderComponent.addFolderAsync();

            // Assert
            folderServiceMock.verify(x => x.addNewFolderAsync('/home/me/Music'), Times.exactly(1));
        });

        it('Should not add a folder with the selected path to the database if the path is empty', async () => {
            // Arrange
            const desktopMock: IMock<Desktop> = Mock.ofType<Desktop>();
            const translatorServiceMock: IMock<BaseTranslatorService> = Mock.ofType<BaseTranslatorService>();
            const folderServiceMock: IMock<BaseFolderService> = Mock.ofType<BaseFolderService>();
            const dialogServiceMock: IMock<BaseDialogService> = Mock.ofType<BaseDialogService>();
            const loggerMock: IMock<Logger> = Mock.ofType<Logger>();
            const addFolderComponent: AddFolderComponent = new AddFolderComponent(
                desktopMock.object,
                translatorServiceMock.object,
                folderServiceMock.object,
                dialogServiceMock.object,
                loggerMock.object);

            translatorServiceMock.setup(x => x.getAsync('Pages.Welcome.Music.SelectFolder')).returns(async () => 'Select a folder');
            desktopMock.setup(x => x.showSelectFolderDialogAsync('Select a folder')).returns(async () => '');

            // Act
            await addFolderComponent.addFolderAsync();

            // Assert
            folderServiceMock.verify(x => x.addNewFolderAsync(It.isAnyString()), Times.never());
        });

        it('Should get all folders from the database if adding a folder succeeds', async () => {
            // Arrange
            const desktopMock: IMock<Desktop> = Mock.ofType<Desktop>();
            const translatorServiceMock: IMock<BaseTranslatorService> = Mock.ofType<BaseTranslatorService>();
            const folderServiceMock: IMock<BaseFolderService> = Mock.ofType<BaseFolderService>();
            const dialogServiceMock: IMock<BaseDialogService> = Mock.ofType<BaseDialogService>();
            const loggerMock: IMock<Logger> = Mock.ofType<Logger>();
            const addFolderComponent: AddFolderComponent = new AddFolderComponent(
                desktopMock.object,
                translatorServiceMock.object,
                folderServiceMock.object,
                dialogServiceMock.object,
                loggerMock.object);

            translatorServiceMock.setup(x => x.getAsync('Pages.Welcome.Music.SelectFolder')).returns(async () => 'Select a folder');
            desktopMock.setup(x => x.showSelectFolderDialogAsync('Select a folder')).returns(async () => '/home/user/music');

            // Act
            await addFolderComponent.addFolderAsync();

            // Assert
            folderServiceMock.verify(x => x.getFolders(), Times.exactly(1));
        });

        it('Should not get all folders from the database if adding a folder fails', async () => {
            // Arrange
            const desktopMock: IMock<Desktop> = Mock.ofType<Desktop>();
            const translatorServiceMock: IMock<BaseTranslatorService> = Mock.ofType<BaseTranslatorService>();
            const folderServiceMock: IMock<BaseFolderService> = Mock.ofType<BaseFolderService>();
            const dialogServiceMock: IMock<BaseDialogService> = Mock.ofType<BaseDialogService>();
            const loggerMock: IMock<Logger> = Mock.ofType<Logger>();
            const addFolderComponent: AddFolderComponent = new AddFolderComponent(
                desktopMock.object,
                translatorServiceMock.object,
                folderServiceMock.object,
                dialogServiceMock.object,
                loggerMock.object);

            translatorServiceMock.setup(x => x.getAsync('Pages.Welcome.Music.SelectFolder')).returns(async () => 'Select a folder');
            desktopMock.setup(x => x.showSelectFolderDialogAsync('Select a folder')).returns(async () => '/home/user/music');
            folderServiceMock.setup(x => x.addNewFolderAsync('/home/user/music')).throws(new Error('An error occurred'));

            // Act
            await addFolderComponent.addFolderAsync();

            // Assert
            folderServiceMock.verify(x => x.getFolders(), Times.never());
        });

        it('Should get the translation for the error dialog if adding a folder fails', async () => {
            // Arrange
            const desktopMock: IMock<Desktop> = Mock.ofType<Desktop>();
            const translatorServiceMock: IMock<BaseTranslatorService> = Mock.ofType<BaseTranslatorService>();
            const folderServiceMock: IMock<BaseFolderService> = Mock.ofType<BaseFolderService>();
            const dialogServiceMock: IMock<BaseDialogService> = Mock.ofType<BaseDialogService>();
            const loggerMock: IMock<Logger> = Mock.ofType<Logger>();
            const addFolderComponent: AddFolderComponent = new AddFolderComponent(
                desktopMock.object,
                translatorServiceMock.object,
                folderServiceMock.object,
                dialogServiceMock.object,
                loggerMock.object);

            translatorServiceMock.setup(x => x.getAsync('Pages.Welcome.Music.SelectFolder')).returns(async () => 'Select a folder');
            desktopMock.setup(x => x.showSelectFolderDialogAsync('Select a folder')).returns(async () => '/home/user/music');
            folderServiceMock.setup(x => x.addNewFolderAsync('/home/user/music')).throws(new Error('An error occurred'));

            // Act
            await addFolderComponent.addFolderAsync();

            // Assert
            translatorServiceMock.verify(x => x.getAsync('ErrorTexts.AddFolderError'), Times.exactly(1));
        });

        it('Should show an error dialog if adding a folder fails', async () => {
            // Arrange
            const desktopMock: IMock<Desktop> = Mock.ofType<Desktop>();
            const translatorServiceMock: IMock<BaseTranslatorService> = Mock.ofType<BaseTranslatorService>();
            const folderServiceMock: IMock<BaseFolderService> = Mock.ofType<BaseFolderService>();
            const dialogServiceMock: IMock<BaseDialogService> = Mock.ofType<BaseDialogService>();
            const loggerMock: IMock<Logger> = Mock.ofType<Logger>();
            const addFolderComponent: AddFolderComponent = new AddFolderComponent(
                desktopMock.object,
                translatorServiceMock.object,
                folderServiceMock.object,
                dialogServiceMock.object,
                loggerMock.object);

            translatorServiceMock.setup(x => x.getAsync('Pages.Welcome.Music.SelectFolder')).returns(async () => 'Select a folder');
            translatorServiceMock.setup(x => x.getAsync('ErrorTexts.AddFolderError')).returns(async () => 'Error while adding folder');
            desktopMock.setup(x => x.showSelectFolderDialogAsync('Select a folder')).returns(async () => '/home/user/music');
            folderServiceMock.setup(x => x.addNewFolderAsync('/home/user/music')).throws(new Error('An error occurred'));

            // Act
            await addFolderComponent.addFolderAsync();

            // Assert
            dialogServiceMock.verify(x => x.showErrorDialog('Error while adding folder'), Times.exactly(1));
        });
    });

    describe('getFoldersAsync', () => {
        it('Should get folders from the database', () => {
            // Arrange
            const desktopMock: IMock<Desktop> = Mock.ofType<Desktop>();
            const translatorServiceMock: IMock<BaseTranslatorService> = Mock.ofType<BaseTranslatorService>();
            const folderServiceMock: IMock<BaseFolderService> = Mock.ofType<BaseFolderService>();
            const dialogServiceMock: IMock<BaseDialogService> = Mock.ofType<BaseDialogService>();
            const loggerMock: IMock<Logger> = Mock.ofType<Logger>();
            const addFolderComponent: AddFolderComponent = new AddFolderComponent(
                desktopMock.object,
                translatorServiceMock.object,
                folderServiceMock.object,
                dialogServiceMock.object,
                loggerMock.object);

            // Act
            addFolderComponent.getFolders();

            // Assert
            folderServiceMock.verify(x => x.getFolders(), Times.exactly(1));
        });
    });

    describe('ngOnInit', () => {
        it('Should get folders from the database', async () => {
            // Arrange
            const desktopMock: IMock<Desktop> = Mock.ofType<Desktop>();
            const translatorServiceMock: IMock<BaseTranslatorService> = Mock.ofType<BaseTranslatorService>();
            const folderServiceMock: IMock<BaseFolderService> = Mock.ofType<BaseFolderService>();
            const dialogServiceMock: IMock<BaseDialogService> = Mock.ofType<BaseDialogService>();
            const loggerMock: IMock<Logger> = Mock.ofType<Logger>();
            const addFolderComponent: AddFolderComponent = new AddFolderComponent(
                desktopMock.object,
                translatorServiceMock.object,
                folderServiceMock.object,
                dialogServiceMock.object,
                loggerMock.object);

            // Act
            await addFolderComponent.ngOnInit();

            // Assert
            folderServiceMock.verify(x => x.getFolders(), Times.exactly(1));
        });
    });

    describe('deleteFolderAsync', () => {
        it('Should get translated text for the delete folder confirmation dialog title', async () => {
            // Arrange
            const desktopMock: IMock<Desktop> = Mock.ofType<Desktop>();
            const translatorServiceMock: IMock<BaseTranslatorService> = Mock.ofType<BaseTranslatorService>();
            const folderServiceMock: IMock<BaseFolderService> = Mock.ofType<BaseFolderService>();
            const dialogServiceMock: IMock<BaseDialogService> = Mock.ofType<BaseDialogService>();
            const loggerMock: IMock<Logger> = Mock.ofType<Logger>();
            const addFolderComponent: AddFolderComponent = new AddFolderComponent(
                desktopMock.object,
                translatorServiceMock.object,
                folderServiceMock.object,
                dialogServiceMock.object,
                loggerMock.object);

            const folderToDelete: Folder = new Folder('/home/user/Music');

            // Act
            await addFolderComponent.deleteFolderAsync(folderToDelete);

            // Assert
            translatorServiceMock.verify(x => x.getAsync('DialogTitles.ConfirmDeleteFolder'), Times.exactly(1));
        });

        it('Should get translated text for the delete folder confirmation dialog text', async () => {
            // Arrange
            const desktopMock: IMock<Desktop> = Mock.ofType<Desktop>();
            const translatorServiceMock: IMock<BaseTranslatorService> = Mock.ofType<BaseTranslatorService>();
            const folderServiceMock: IMock<BaseFolderService> = Mock.ofType<BaseFolderService>();
            const dialogServiceMock: IMock<BaseDialogService> = Mock.ofType<BaseDialogService>();
            const loggerMock: IMock<Logger> = Mock.ofType<Logger>();
            const addFolderComponent: AddFolderComponent = new AddFolderComponent(
                desktopMock.object,
                translatorServiceMock.object,
                folderServiceMock.object,
                dialogServiceMock.object,
                loggerMock.object);

            const folderToDelete: Folder = new Folder('/home/user/Music');

            // Act
            await addFolderComponent.deleteFolderAsync(folderToDelete);

            // Assert
            translatorServiceMock.verify(x => x.getAsync(
                'DialogTexts.ConfirmDeleteFolder',
                { folderPath: folderToDelete.path }), Times.exactly(1));
        });

        it('Should show a confirmation dialog', async () => {
            // Arrange
            const desktopMock: IMock<Desktop> = Mock.ofType<Desktop>();
            const translatorServiceMock: IMock<BaseTranslatorService> = Mock.ofType<BaseTranslatorService>();
            const folderServiceMock: IMock<BaseFolderService> = Mock.ofType<BaseFolderService>();
            const dialogServiceMock: IMock<BaseDialogService> = Mock.ofType<BaseDialogService>();
            const loggerMock: IMock<Logger> = Mock.ofType<Logger>();
            const addFolderComponent: AddFolderComponent = new AddFolderComponent(
                desktopMock.object,
                translatorServiceMock.object,
                folderServiceMock.object,
                dialogServiceMock.object,
                loggerMock.object);

            const folderToDelete: Folder = new Folder('/home/user/Music');

            translatorServiceMock.setup(x => x.getAsync('DialogTitles.ConfirmDeleteFolder')).returns(async () => 'Delete folder?');
            translatorServiceMock.setup(x => x.getAsync(
                'DialogTexts.ConfirmDeleteFolder',
                { folderPath: folderToDelete.path })).returns(async () => 'Are you sure you want to delete this folder?');

            // Act
            await addFolderComponent.deleteFolderAsync(folderToDelete);

            // Assert
            dialogServiceMock.verify(x => x.showConfirmationDialogAsync(
                'Delete folder?',
                'Are you sure you want to delete this folder?'), Times.exactly(1));
        });

        it('Should delete the folder if the user has confirmed deletion', async () => {
            // Arrange
            const desktopMock: IMock<Desktop> = Mock.ofType<Desktop>();
            const translatorServiceMock: IMock<BaseTranslatorService> = Mock.ofType<BaseTranslatorService>();
            const folderServiceMock: IMock<BaseFolderService> = Mock.ofType<BaseFolderService>();
            const dialogServiceMock: IMock<BaseDialogService> = Mock.ofType<BaseDialogService>();
            const loggerMock: IMock<Logger> = Mock.ofType<Logger>();
            const addFolderComponent: AddFolderComponent = new AddFolderComponent(
                desktopMock.object,
                translatorServiceMock.object,
                folderServiceMock.object,
                dialogServiceMock.object,
                loggerMock.object);

            const folderToDelete: Folder = new Folder('/home/user/Music');

            translatorServiceMock.setup(x => x.getAsync('DialogTitles.ConfirmDeleteFolder')).returns(async () => 'Delete folder?');
            translatorServiceMock.setup(x => x.getAsync(
                'DialogTexts.ConfirmDeleteFolder',
                { folderPath: folderToDelete.path })).returns(async () => 'Are you sure you want to delete this folder?');

            dialogServiceMock.setup(x => x.showConfirmationDialogAsync(
                'Delete folder?',
                'Are you sure you want to delete this folder?')).returns(async () => true);

            // Act
            await addFolderComponent.deleteFolderAsync(folderToDelete);

            // Assert
            folderServiceMock.verify(x => x.deleteFolder(folderToDelete), Times.exactly(1));
        });

        it('Should not delete the folder if the user has not confirmed deletion', async () => {
            // Arrange
            const desktopMock: IMock<Desktop> = Mock.ofType<Desktop>();
            const translatorServiceMock: IMock<BaseTranslatorService> = Mock.ofType<BaseTranslatorService>();
            const folderServiceMock: IMock<BaseFolderService> = Mock.ofType<BaseFolderService>();
            const dialogServiceMock: IMock<BaseDialogService> = Mock.ofType<BaseDialogService>();
            const loggerMock: IMock<Logger> = Mock.ofType<Logger>();
            const addFolderComponent: AddFolderComponent = new AddFolderComponent(
                desktopMock.object,
                translatorServiceMock.object,
                folderServiceMock.object,
                dialogServiceMock.object,
                loggerMock.object);

            const folderToDelete: Folder = new Folder('/home/user/Music');

            translatorServiceMock.setup(x => x.getAsync('DialogTitles.ConfirmDeleteFolder')).returns(async () => 'Delete folder?');
            translatorServiceMock.setup(x => x.getAsync(
                'DialogTexts.ConfirmDeleteFolder',
                { folderPath: folderToDelete.path })).returns(async () => 'Are you sure you want to delete this folder?');

            dialogServiceMock.setup(x => x.showConfirmationDialogAsync(
                'Delete folder?',
                'Are you sure you want to delete this folder?')).returns(async () => false);

            // Act
            await addFolderComponent.deleteFolderAsync(folderToDelete);

            // Assert
            folderServiceMock.verify(x => x.deleteFolder(folderToDelete), Times.never());
        });

        it('Should get all folders if the user has confirmed deletion', async () => {
            // Arrange
            const desktopMock: IMock<Desktop> = Mock.ofType<Desktop>();
            const translatorServiceMock: IMock<BaseTranslatorService> = Mock.ofType<BaseTranslatorService>();
            const folderServiceMock: IMock<BaseFolderService> = Mock.ofType<BaseFolderService>();
            const dialogServiceMock: IMock<BaseDialogService> = Mock.ofType<BaseDialogService>();
            const loggerMock: IMock<Logger> = Mock.ofType<Logger>();
            const addFolderComponent: AddFolderComponent = new AddFolderComponent(
                desktopMock.object,
                translatorServiceMock.object,
                folderServiceMock.object,
                dialogServiceMock.object,
                loggerMock.object);

            const folderToDelete: Folder = new Folder('/home/user/Music');

            translatorServiceMock.setup(x => x.getAsync('DialogTitles.ConfirmDeleteFolder')).returns(async () => 'Delete folder?');
            translatorServiceMock.setup(x => x.getAsync(
                'DialogTexts.ConfirmDeleteFolder',
                { folderPath: folderToDelete.path })).returns(async () => 'Are you sure you want to delete this folder?');

            dialogServiceMock.setup(x => x.showConfirmationDialogAsync(
                'Delete folder?',
                'Are you sure you want to delete this folder?')).returns(async () => true);

            // Act
            await addFolderComponent.deleteFolderAsync(folderToDelete);

            // Assert
            folderServiceMock.verify(x => x.getFolders(), Times.exactly(1));
        });

        it('Should not get all the folders if the user has not confirmed deletion', async () => {
            // Arrange
            const desktopMock: IMock<Desktop> = Mock.ofType<Desktop>();
            const translatorServiceMock: IMock<BaseTranslatorService> = Mock.ofType<BaseTranslatorService>();
            const folderServiceMock: IMock<BaseFolderService> = Mock.ofType<BaseFolderService>();
            const dialogServiceMock: IMock<BaseDialogService> = Mock.ofType<BaseDialogService>();
            const loggerMock: IMock<Logger> = Mock.ofType<Logger>();
            const addFolderComponent: AddFolderComponent = new AddFolderComponent(
                desktopMock.object,
                translatorServiceMock.object,
                folderServiceMock.object,
                dialogServiceMock.object,
                loggerMock.object);

            const folderToDelete: Folder = new Folder('/home/user/Music');

            translatorServiceMock.setup(x => x.getAsync('DialogTitles.ConfirmDeleteFolder')).returns(async () => 'Delete folder?');
            translatorServiceMock.setup(x => x.getAsync(
                'DialogTexts.ConfirmDeleteFolder',
                { folderPath: folderToDelete.path })).returns(async () => 'Are you sure you want to delete this folder?');

            dialogServiceMock.setup(x => x.showConfirmationDialogAsync(
                'Delete folder?',
                'Are you sure you want to delete this folder?')).returns(async () => false);

            // Act
            await addFolderComponent.deleteFolderAsync(folderToDelete);

            // Assert
            folderServiceMock.verify(x => x.getFolders(), Times.never());
        });

        it('Should get the translation for the error dialog if deleting a folder fails', async () => {
            // Arrange
            const desktopMock: IMock<Desktop> = Mock.ofType<Desktop>();
            const translatorServiceMock: IMock<BaseTranslatorService> = Mock.ofType<BaseTranslatorService>();
            const folderServiceMock: IMock<BaseFolderService> = Mock.ofType<BaseFolderService>();
            const dialogServiceMock: IMock<BaseDialogService> = Mock.ofType<BaseDialogService>();
            const loggerMock: IMock<Logger> = Mock.ofType<Logger>();
            const addFolderComponent: AddFolderComponent = new AddFolderComponent(
                desktopMock.object,
                translatorServiceMock.object,
                folderServiceMock.object,
                dialogServiceMock.object,
                loggerMock.object);

            const folderToDelete: Folder = new Folder('/home/user/Music');

            translatorServiceMock.setup(x => x.getAsync('DialogTitles.ConfirmDeleteFolder')).returns(async () => 'Delete folder?');
            translatorServiceMock.setup(x => x.getAsync(
                'DialogTexts.ConfirmDeleteFolder',
                { folderPath: folderToDelete.path })).returns(async () => 'Are you sure you want to delete this folder?');

            dialogServiceMock.setup(x => x.showConfirmationDialogAsync(
                'Delete folder?',
                'Are you sure you want to delete this folder?')).returns(async () => true);

            folderServiceMock.setup(x => x.deleteFolder(folderToDelete)).throws(new Error('An error occurred'));

            // Act
            await addFolderComponent.deleteFolderAsync(folderToDelete);

            // Assert
            translatorServiceMock.verify(x => x.getAsync('ErrorTexts.DeleteFolderError'), Times.exactly(1));
        });

        it('Should show an error dialog if deleting a folder fails', async () => {
            // Arrange
            const desktopMock: IMock<Desktop> = Mock.ofType<Desktop>();
            const translatorServiceMock: IMock<BaseTranslatorService> = Mock.ofType<BaseTranslatorService>();
            const folderServiceMock: IMock<BaseFolderService> = Mock.ofType<BaseFolderService>();
            const dialogServiceMock: IMock<BaseDialogService> = Mock.ofType<BaseDialogService>();
            const loggerMock: IMock<Logger> = Mock.ofType<Logger>();
            const addFolderComponent: AddFolderComponent = new AddFolderComponent(
                desktopMock.object,
                translatorServiceMock.object,
                folderServiceMock.object,
                dialogServiceMock.object,
                loggerMock.object);

            const folderToDelete: Folder = new Folder('/home/user/Music');

            translatorServiceMock.setup(x => x.getAsync('DialogTitles.ConfirmDeleteFolder')).returns(async () => 'Delete folder?');
            translatorServiceMock.setup(x => x.getAsync('ErrorTexts.DeleteFolderError')).returns(async () => 'Error while deleting folder');
            translatorServiceMock.setup(x => x.getAsync(
                'DialogTexts.ConfirmDeleteFolder',
                { folderPath: folderToDelete.path })).returns(async () => 'Are you sure you want to delete this folder?');

            dialogServiceMock.setup(x => x.showConfirmationDialogAsync(
                'Delete folder?',
                'Are you sure you want to delete this folder?')).returns(async () => true);

            folderServiceMock.setup(x => x.deleteFolder(folderToDelete)).throws(new Error('An error occurred'));

            // Act
            await addFolderComponent.deleteFolderAsync(folderToDelete);

            // Assert
            dialogServiceMock.verify(x => x.showErrorDialog('Error while deleting folder'), Times.exactly(1));
        });
    });
});
