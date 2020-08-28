<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class AuthController extends ApiController
{
    public function register(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, ValidatorInterface $validator, UserPasswordEncoderInterface $encoder): JsonResponse
    {
        //$data = json_decode($request->getContent(), true);

        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user);

        $form->submit($request->request->all(), false);

        if ($form->isValid()) {
            $user->setPassword(
                $encoder->encodePassword($user, $form->get('password')->getData())
            );

            if(!$request->files->has('avatar')) {
                $user->setAvatar('default.jpg');
            } else {
                $image = $request->files->get('avatar');
                $fichier = md5(uniqid('', true)).'.'.$image->guessExtension();
                $image->move(
                    $this->getParameter('images_directory'),
                    $fichier
                );
                $user->setAvatar($fichier);
            }

            $em->persist($user);
            $em->flush();

            return $this->respondCreated("ok");
        }

//        print_r($this->getErrorsFromForm($form));
        return $this
            ->setStatusCode(500)
            ->respondWithErrors($this->getErrorsFromForm($form));
    }

    private function getErrorsFromForm(FormInterface $form)
    {
        $errors = array();
        foreach ($form->getErrors() as $error) {
            $errors[] = $error->getMessage();
        }
        foreach ($form->all() as $childForm) {
            if ($childForm instanceof FormInterface) {
                if ($childErrors = $this->getErrorsFromForm($childForm)) {
                    $errors[$childForm->getName()] = $childErrors;
                }
            }
        }
        return $errors;
    }
}